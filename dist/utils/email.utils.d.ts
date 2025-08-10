export declare const sendEmail: (to: string, subject: string, html: string) => Promise<boolean>;
export declare const sendOTPEmail: (email: string, otp: string, name: string) => Promise<boolean>;
export declare const sendPasswordResetEmail: (email: string, resetUrl: string, name: string) => Promise<boolean>;
export declare const sendWelcomeEmail: (email: string, name: string) => Promise<boolean>;
export declare const sendCertificateEmail: (email: string, name: string, level: string, certificateNumber: string) => Promise<boolean>;
export declare const sendAssessmentFailureEmail: (email: string, name: string, step: number, percentage: number) => Promise<boolean>;
export declare const testEmailConfiguration: () => Promise<boolean>;
//# sourceMappingURL=email.utils.d.ts.map