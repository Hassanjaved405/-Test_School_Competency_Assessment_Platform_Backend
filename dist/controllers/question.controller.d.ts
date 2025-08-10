import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
export declare const getAllQuestions: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getQuestionById: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const createQuestion: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateQuestion: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteQuestion: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const bulkCreateQuestions: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getQuestionStats: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=question.controller.d.ts.map