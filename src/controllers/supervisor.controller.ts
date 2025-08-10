import { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import Assessment from '../models/Assessment.model';
import Certificate from '../models/Certificate.model';
import { AppError } from '../middleware/error.middleware';
import { AuthRequest, UserRole } from '../types';

// Get all students under supervision
export const getMyStudents = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const supervisorId = req.user?.id;
    
    // Get all students (in a real app, you'd have a supervisor-student relationship)
    const students = await User.find({ 
      role: UserRole.STUDENT,
      isActive: true 
    }).select('-password -otp -otpExpiry -resetToken -resetTokenExpiry');
    
    // Get assessment status for each student
    const studentsWithStatus = await Promise.all(
      students.map(async (student) => {
        const assessment = await Assessment.findOne({ userId: student._id });
        const certificate = await Certificate.findOne({ userId: student._id });
        
        return {
          ...student.toObject(),
          assessmentStatus: assessment ? {
            currentStep: assessment.currentStep,
            isCompleted: assessment.isCompleted,
            finalLevel: assessment.finalLevel,
            totalTimeSpent: assessment.totalTimeSpent
          } : null,
          hasCertificate: !!certificate,
          certificateLevel: certificate?.level || null
        };
      })
    );
    
    res.status(200).json({
      success: true,
      data: {
        students: studentsWithStatus,
        totalStudents: studentsWithStatus.length,
        completedAssessments: studentsWithStatus.filter(s => s.assessmentStatus?.isCompleted).length,
        studentsWithCertificates: studentsWithStatus.filter(s => s.hasCertificate).length
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get detailed progress of a specific student
export const getStudentProgress = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { studentId } = req.params;
    
    const student = await User.findById(studentId).select('-password -otp -otpExpiry');
    if (!student) {
      throw new AppError('Student not found', 404);
    }
    
    const assessment = await Assessment.findOne({ userId: studentId });
    const certificate = await Certificate.findOne({ userId: studentId });
    
    let detailedProgress = null;
    if (assessment) {
      detailedProgress = {
        currentStep: assessment.currentStep,
        isCompleted: assessment.isCompleted,
        finalLevel: assessment.finalLevel,
        totalTimeSpent: assessment.totalTimeSpent,
        step1: {
          completed: !!assessment.step1?.completedAt,
          score: assessment.step1?.score || 0,
          percentage: assessment.step1?.percentage || 0,
          timeSpent: assessment.step1?.completedAt && assessment.step1?.startedAt
            ? (new Date(assessment.step1.completedAt).getTime() - new Date(assessment.step1.startedAt).getTime()) / 1000
            : 0
        },
        step2: {
          completed: !!assessment.step2?.completedAt,
          score: assessment.step2?.score || 0,
          percentage: assessment.step2?.percentage || 0,
          timeSpent: assessment.step2?.completedAt && assessment.step2?.startedAt
            ? (new Date(assessment.step2.completedAt).getTime() - new Date(assessment.step2.startedAt).getTime()) / 1000
            : 0
        },
        step3: {
          completed: !!assessment.step3?.completedAt,
          score: assessment.step3?.score || 0,
          percentage: assessment.step3?.percentage || 0,
          timeSpent: assessment.step3?.completedAt && assessment.step3?.startedAt
            ? (new Date(assessment.step3.completedAt).getTime() - new Date(assessment.step3.startedAt).getTime()) / 1000
            : 0
        }
      };
    }
    
    res.status(200).json({
      success: true,
      data: {
        student: student.toObject(),
        assessment: detailedProgress,
        certificate: certificate ? {
          level: certificate.level,
          issuedDate: certificate.issuedDate,
          certificateNumber: certificate.certificateNumber
        } : null
      }
    });
  } catch (error) {
    next(error);
  }
};

// Generate progress report for all students
export const generateProgressReport = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;
    
    let dateFilter: any = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate as string);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate as string);
    }
    
    const students = await User.find({ 
      role: UserRole.STUDENT,
      ...dateFilter 
    }).select('firstName lastName email createdAt');
    
    const assessments = await Assessment.find({
      userId: { $in: students.map(s => s._id) }
    });
    
    const certificates = await Certificate.find({
      userId: { $in: students.map(s => s._id) }
    });
    
    // Create assessment and certificate maps for quick lookup
    const assessmentMap = new Map(assessments.map(a => [a.userId.toString(), a]));
    const certificateMap = new Map(certificates.map(c => [c.userId.toString(), c]));
    
    const report = students.map(student => {
      const assessment = assessmentMap.get((student._id as any).toString());
      const certificate = certificateMap.get((student._id as any).toString());
      
      return {
        studentId: student._id,
        name: `${student.firstName} ${student.lastName}`,
        email: student.email,
        registrationDate: student.createdAt,
        assessmentStatus: assessment ? {
          started: true,
          completed: assessment.isCompleted,
          currentStep: assessment.currentStep,
          finalLevel: assessment.finalLevel,
          step1Score: assessment.step1?.percentage || 0,
          step2Score: assessment.step2?.percentage || 0,
          step3Score: assessment.step3?.percentage || 0,
          totalTimeSpent: assessment.totalTimeSpent
        } : {
          started: false,
          completed: false
        },
        certificateEarned: !!certificate,
        certificateLevel: certificate?.level || null
      };
    });
    
    // Calculate statistics
    const stats = {
      totalStudents: report.length,
      assessmentsStarted: report.filter(r => r.assessmentStatus.started).length,
      assessmentsCompleted: report.filter(r => r.assessmentStatus.completed).length,
      certificatesEarned: report.filter(r => r.certificateEarned).length,
      levelDistribution: {
        A1: certificates.filter(c => c.level === 'A1').length,
        A2: certificates.filter(c => c.level === 'A2').length,
        B1: certificates.filter(c => c.level === 'B1').length,
        B2: certificates.filter(c => c.level === 'B2').length,
        C1: certificates.filter(c => c.level === 'C1').length,
        C2: certificates.filter(c => c.level === 'C2').length
      },
      averageCompletionRate: report.length > 0 
        ? (report.filter(r => r.assessmentStatus.completed).length / report.length * 100).toFixed(1)
        : 0
    };
    
    res.status(200).json({
      success: true,
      data: {
        report,
        statistics: stats,
        generatedAt: new Date(),
        period: {
          start: startDate || 'All time',
          end: endDate || 'Present'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get performance analytics
export const getPerformanceAnalytics = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const assessments = await Assessment.find({ isCompleted: true });
    
    if (assessments.length === 0) {
      res.status(200).json({
        success: true,
        data: {
          message: 'No completed assessments found',
          analytics: null
        }
      });
      return;
    }
    
    // Calculate step-wise performance
    const stepPerformance = {
      step1: {
        totalAttempts: assessments.filter(a => a.step1?.completedAt).length,
        averageScore: 0,
        passRate: 0
      },
      step2: {
        totalAttempts: assessments.filter(a => a.step2?.completedAt).length,
        averageScore: 0,
        passRate: 0
      },
      step3: {
        totalAttempts: assessments.filter(a => a.step3?.completedAt).length,
        averageScore: 0,
        passRate: 0
      }
    };
    
    // Calculate averages and pass rates
    const step1Scores = assessments
      .filter(a => a.step1?.completedAt)
      .map(a => a.step1.percentage);
    if (step1Scores.length > 0) {
      stepPerformance.step1.averageScore = step1Scores.reduce((a, b) => a + b, 0) / step1Scores.length;
      stepPerformance.step1.passRate = (step1Scores.filter(s => s >= 25).length / step1Scores.length) * 100;
    }
    
    const step2Scores = assessments
      .filter(a => a.step2?.completedAt)
      .map(a => a.step2.percentage);
    if (step2Scores.length > 0) {
      stepPerformance.step2.averageScore = step2Scores.reduce((a, b) => a + b, 0) / step2Scores.length;
      stepPerformance.step2.passRate = (step2Scores.filter(s => s >= 25).length / step2Scores.length) * 100;
    }
    
    const step3Scores = assessments
      .filter(a => a.step3?.completedAt)
      .map(a => a.step3.percentage);
    if (step3Scores.length > 0) {
      stepPerformance.step3.averageScore = step3Scores.reduce((a, b) => a + b, 0) / step3Scores.length;
      stepPerformance.step3.passRate = (step3Scores.filter(s => s >= 25).length / step3Scores.length) * 100;
    }
    
    // Time analysis
    const averageTimePerStep = {
      step1: assessments
        .filter(a => a.step1?.completedAt && a.step1?.startedAt)
        .reduce((sum, a) => {
          const time = (new Date(a.step1.completedAt!).getTime() - new Date(a.step1.startedAt!).getTime()) / 1000 / 60;
          return sum + time;
        }, 0) / (stepPerformance.step1.totalAttempts || 1),
      step2: assessments
        .filter(a => a.step2?.completedAt && a.step2?.startedAt)
        .reduce((sum, a) => {
          const time = (new Date(a.step2.completedAt!).getTime() - new Date(a.step2.startedAt!).getTime()) / 1000 / 60;
          return sum + time;
        }, 0) / (stepPerformance.step2.totalAttempts || 1),
      step3: assessments
        .filter(a => a.step3?.completedAt && a.step3?.startedAt)
        .reduce((sum, a) => {
          const time = (new Date(a.step3.completedAt!).getTime() - new Date(a.step3.startedAt!).getTime()) / 1000 / 60;
          return sum + time;
        }, 0) / (stepPerformance.step3.totalAttempts || 1)
    };
    
    res.status(200).json({
      success: true,
      data: {
        totalAssessments: assessments.length,
        completionRate: (assessments.filter(a => a.isCompleted).length / assessments.length * 100).toFixed(1),
        stepPerformance,
        averageTimePerStep: {
          step1: `${averageTimePerStep.step1.toFixed(1)} minutes`,
          step2: `${averageTimePerStep.step2.toFixed(1)} minutes`,
          step3: `${averageTimePerStep.step3.toFixed(1)} minutes`
        },
        levelDistribution: {
          A1: assessments.filter(a => a.finalLevel === 'A1').length,
          A2: assessments.filter(a => a.finalLevel === 'A2').length,
          B1: assessments.filter(a => a.finalLevel === 'B1').length,
          B2: assessments.filter(a => a.finalLevel === 'B2').length,
          C1: assessments.filter(a => a.finalLevel === 'C1').length,
          C2: assessments.filter(a => a.finalLevel === 'C2').length,
          none: assessments.filter(a => !a.finalLevel).length
        }
      }
    });
  } catch (error) {
    next(error);
  }
};