import { Response, NextFunction } from 'express';
import { AuthRequest, UserRole } from '../types';
export declare const authenticate: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const authorize: (...roles: UserRole[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map