import { Response, NextFunction } from 'express';
import Assessment from '../models/Assessment.model';
import Question from '../models/Question.model';
import Certificate from '../models/Certificate.model';
import { AuthRequest, CompetencyLevel, AssessmentStep } from '../types';
import { AppError } from '../middleware/error.middleware';
import { sendCertificateEmail } from '../utils/email.utils';
import User from '../models/User.model';

export const startAssessment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    let assessment = await Assessment.findOne({ 
      userId, 
      isCompleted: false 
    });
    
    if (assessment) {
      res.status(200).json({
        success: true,
        message: 'Continuing existing assessment',
        data: { assessment }
      });
      return;
    }
    
    const existingCompleted = await Assessment.findOne({
      userId,
      isCompleted: true,
      'step1.percentage': { $lt: 25 }
    });
    
    if (existingCompleted) {
      throw new AppError('You failed Step 1 and cannot retake the assessment', 403);
    }
    
    assessment = await Assessment.create({
      userId,
      currentStep: AssessmentStep.STEP_1
    });
    
    res.status(201).json({
      success: true,
      message: 'Assessment started successfully',
      data: { assessment }
    });
  } catch (error) {
    next(error);
  }
};

export const getStepQuestions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const step = parseInt(req.params.step);
    
    if (![1, 2, 3].includes(step)) {
      throw new AppError('Invalid step number', 400);
    }
    
    const assessment = await Assessment.findOne({ userId, isCompleted: false });
    
    if (!assessment) {
      throw new AppError('No active assessment found', 404);
    }
    
    if (step > assessment.currentStep) {
      throw new AppError('You cannot access this step yet', 403);
    }
    
    if (step < assessment.currentStep) {
      throw new AppError('You have already completed this step', 400);
    }
    
    const stepKey = `step${step}` as 'step1' | 'step2' | 'step3';
    
    if (assessment[stepKey].questions.length === 0) {
      let levels: CompetencyLevel[] = [];
      
      if (step === 1) {
        levels = [CompetencyLevel.A1, CompetencyLevel.A2];
      } else if (step === 2) {
        levels = [CompetencyLevel.B1, CompetencyLevel.B2];
      } else {
        levels = [CompetencyLevel.C1, CompetencyLevel.C2];
      }
      
      const questions = await Question.aggregate([
        { $match: { level: { $in: levels }, isActive: true } },
        { $sample: { size: 44 } }
      ]);
      
      if (questions.length < 44) {
        throw new AppError('Not enough questions available for this step', 500);
      }
      
      assessment[stepKey].questions = questions.map(q => (q._id as any));
      assessment[stepKey].startedAt = new Date();
      await assessment.save();
    }
    
    const questions = await Question.find({
      _id: { $in: assessment[stepKey].questions }
    }).select('-correctAnswer -explanation');
    
    res.status(200).json({
      success: true,
      data: {
        step,
        questions,
        startedAt: assessment[stepKey].startedAt,
        timePerQuestion: 60
      }
    });
  } catch (error) {
    next(error);
  }
};

export const submitStepAnswers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const step = parseInt(req.params.step);
    const { answers } = req.body;
    
    if (![1, 2, 3].includes(step)) {
      throw new AppError('Invalid step number', 400);
    }
    
    const assessment = await Assessment.findOne({ userId, isCompleted: false });
    
    if (!assessment) {
      throw new AppError('No active assessment found', 404);
    }
    
    if (step !== assessment.currentStep) {
      throw new AppError('Invalid step submission', 400);
    }
    
    const stepKey = `step${step}` as 'step1' | 'step2' | 'step3';
    
    const questions = await Question.find({
      _id: { $in: assessment[stepKey].questions }
    });
    
    let correctAnswers = 0;
    const processedAnswers = answers.map((answer: any) => {
      const question = questions.find(q => (q._id as any).toString() === answer.questionId);
      if (question && question.correctAnswer === answer.answer) {
        correctAnswers++;
      }
      return {
        questionId: answer.questionId,
        answer: answer.answer || '',
        timeSpent: answer.timeSpent || 0
      };
    });
    
    if (questions.length === 0) {
      throw new AppError('No questions found for assessment', 500);
    }
    
    const percentage = Math.round((correctAnswers / questions.length) * 100 * 100) / 100;
    
    assessment[stepKey].answers = processedAnswers;
    assessment[stepKey].score = correctAnswers;
    assessment[stepKey].percentage = percentage;
    assessment[stepKey].completedAt = new Date();
    
    let proceedToNext = false;
    let finalLevel: CompetencyLevel | null = null;
    
    if (step === 1) {
      if (percentage < 25) {
        assessment.isCompleted = true;
        assessment.finalLevel = null;
      } else if (percentage < 50) {
        finalLevel = CompetencyLevel.A1;
        assessment.finalLevel = finalLevel;
        assessment.isCompleted = true;
      } else if (percentage < 75) {
        finalLevel = CompetencyLevel.A2;
        assessment.finalLevel = finalLevel;
        assessment.isCompleted = true;
      } else {
        finalLevel = CompetencyLevel.A2;
        assessment.finalLevel = finalLevel;
        proceedToNext = true;
        assessment.currentStep = AssessmentStep.STEP_2;
      }
    } else if (step === 2) {
      if (percentage < 25) {
        finalLevel = assessment.finalLevel || CompetencyLevel.A2;
        assessment.isCompleted = true;
      } else if (percentage < 50) {
        finalLevel = CompetencyLevel.B1;
        assessment.finalLevel = finalLevel;
        assessment.isCompleted = true;
      } else if (percentage < 75) {
        finalLevel = CompetencyLevel.B2;
        assessment.finalLevel = finalLevel;
        assessment.isCompleted = true;
      } else {
        finalLevel = CompetencyLevel.B2;
        assessment.finalLevel = finalLevel;
        proceedToNext = true;
        assessment.currentStep = AssessmentStep.STEP_3;
      }
    } else {
      if (percentage < 25) {
        finalLevel = CompetencyLevel.B2;
      } else if (percentage < 50) {
        finalLevel = CompetencyLevel.C1;
      } else {
        finalLevel = CompetencyLevel.C2;
      }
      assessment.finalLevel = finalLevel;
      assessment.isCompleted = true;
    }
    
    const totalTime = assessment.step1.answers.reduce((acc, ans) => acc + ans.timeSpent, 0) +
                     assessment.step2.answers.reduce((acc, ans) => acc + ans.timeSpent, 0) +
                     assessment.step3.answers.reduce((acc, ans) => acc + ans.timeSpent, 0);
    
    assessment.totalTimeSpent = totalTime;
    
    await assessment.save();
    
    if (assessment.isCompleted && finalLevel) {
      const certificate = await Certificate.create({
        userId,
        assessmentId: (assessment._id as any),
        level: finalLevel
      });
      
      const user = await User.findById(userId);
      if (user) {
        await sendCertificateEmail(
          user.email,
          user.firstName,
          finalLevel,
          certificate.certificateNumber
        );
      }
    }
    
    res.status(200).json({
      success: true,
      message: `Step ${step} completed`,
      data: {
        score: correctAnswers,
        totalQuestions: questions.length,
        percentage,
        finalLevel,
        proceedToNext,
        isCompleted: assessment.isCompleted
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAssessmentStatus = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    const assessment = await Assessment.findOne({ userId })
      .sort({ createdAt: -1 })
      .populate('step1.questions', 'questionText level competency')
      .populate('step2.questions', 'questionText level competency')
      .populate('step3.questions', 'questionText level competency');
    
    if (!assessment) {
      res.status(200).json({
        success: true,
        data: { hasAssessment: false }
      });
      return;
    }
    
    const certificate = assessment.isCompleted && assessment.finalLevel
      ? await Certificate.findOne({ assessmentId: assessment._id })
      : null;
    
    res.status(200).json({
      success: true,
      data: {
        hasAssessment: true,
        assessment,
        certificate
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAssessmentHistory = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 10 } = req.query;
    
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    const total = await Assessment.countDocuments({ userId });
    
    const assessments = await Assessment.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('currentStep finalLevel isCompleted totalTimeSpent createdAt updatedAt');
    
    res.status(200).json({
      success: true,
      data: { assessments },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
};