import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
export declare const register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyOTP: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const resendOTP: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const logout: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const forgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const resetPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getProfile: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateProfile: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map