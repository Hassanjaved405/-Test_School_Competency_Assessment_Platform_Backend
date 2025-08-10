import { Response, NextFunction, Request } from 'express';
import { AuthRequest } from '../types';
export declare const getMyCertificates: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getCertificateById: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyCertificate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const generateCertificatePDF: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const regenerateCertificate: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=certificate.controller.d.ts.map