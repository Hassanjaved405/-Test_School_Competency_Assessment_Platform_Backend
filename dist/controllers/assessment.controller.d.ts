import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
export declare const startAssessment: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getStepQuestions: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const submitStepAnswers: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getAssessmentStatus: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getAssessmentHistory: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=assessment.controller.d.ts.map