import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
export declare const getMyStudents: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getStudentProgress: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const generateProgressReport: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getPerformanceAnalytics: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=supervisor.controller.d.ts.map