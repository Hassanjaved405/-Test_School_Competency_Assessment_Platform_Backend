import { Response, NextFunction } from 'express';
import Question from '../models/Question.model';
import { AuthRequest, UserRole, CompetencyLevel } from '../types';
import { AppError } from '../middleware/error.middleware';

export const getAllQuestions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10, competency, level, difficulty, isActive } = req.query;
    
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    const query: any = {};
    
    if (competency) {
      query.competency = { $regex: competency, $options: 'i' };
    }
    
    if (level) {
      query.level = level;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    const total = await Question.countDocuments(query);
    
    const questions = await Question.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    
    res.status(200).json({
      success: true,
      data: { questions },
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

export const getQuestionById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    
    const question = await Question.findById(id);
    
    if (!question) {
      throw new AppError('Question not found', 404);
    }
    
    res.status(200).json({
      success: true,
      data: { question }
    });
  } catch (error) {
    next(error);
  }
};

export const createQuestion = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const questionData = req.body;
    
    const question = await Question.create(questionData);
    
    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      data: { question }
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const question = await Question.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!question) {
      throw new AppError('Question not found', 404);
    }
    
    res.status(200).json({
      success: true,
      message: 'Question updated successfully',
      data: { question }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    
    const question = await Question.findByIdAndDelete(id);
    
    if (!question) {
      throw new AppError('Question not found', 404);
    }
    
    res.status(200).json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const bulkCreateQuestions = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { questions } = req.body;
    
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new AppError('Questions array is required', 400);
    }
    
    const createdQuestions = await Question.insertMany(questions, { 
      ordered: false,
      rawResult: false 
    });
    
    res.status(201).json({
      success: true,
      message: `${createdQuestions.length} questions created successfully`,
      data: { 
        count: createdQuestions.length,
        questions: createdQuestions 
      }
    });
  } catch (error: any) {
    if (error.code === 11000) {
      next(new AppError('Duplicate questions found', 400));
    } else {
      next(error);
    }
  }
};

export const getQuestionStats = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stats = await Question.aggregate([
      {
        $group: {
          _id: {
            level: '$level',
            competency: '$competency'
          },
          count: { $sum: 1 },
          activeCount: {
            $sum: { $cond: ['$isActive', 1, 0] }
          }
        }
      },
      {
        $group: {
          _id: '$_id.level',
          competencies: {
            $push: {
              competency: '$_id.competency',
              count: '$count',
              activeCount: '$activeCount'
            }
          },
          totalCount: { $sum: '$count' },
          totalActiveCount: { $sum: '$activeCount' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    const totalQuestions = await Question.countDocuments();
    const activeQuestions = await Question.countDocuments({ isActive: true });
    
    const competencyList = await Question.distinct('competency');
    
    res.status(200).json({
      success: true,
      data: {
        totalQuestions,
        activeQuestions,
        totalCompetencies: competencyList.length,
        levelStats: stats,
        competencies: competencyList
      }
    });
  } catch (error) {
    next(error);
  }
};