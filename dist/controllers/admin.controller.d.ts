import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
export declare const getAllUsers: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getUserById: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateUserStatus: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateUserRole: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteUser: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getDashboardStats: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const createUser: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateUser: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const resetUserPassword: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteUserAssessment: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getAssessmentReports: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=admin.controller.d.ts.map