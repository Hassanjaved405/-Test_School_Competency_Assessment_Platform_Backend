import { Request } from 'express';
import { Document } from 'mongoose';
export declare enum UserRole {
    ADMIN = "admin",
    STUDENT = "student",
    SUPERVISOR = "supervisor"
}
export declare enum CompetencyLevel {
    A1 = "A1",
    A2 = "A2",
    B1 = "B1",
    B2 = "B2",
    C1 = "C1",
    C2 = "C2"
}
export declare enum AssessmentStep {
    STEP_1 = 1,
    STEP_2 = 2,
    STEP_3 = 3
}
export declare enum QuestionDifficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    emailVerificationExpires?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    refreshToken?: string;
    otp?: string;
    otpExpires?: Date;
    otpAttempts?: number;
    lastLogin?: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateOTP(): string;
}
export interface IQuestion extends Document {
    competency: string;
    level: CompetencyLevel;
    questionText: string;
    options: {
        a: string;
        b: string;
        c: string;
        d: string;
    };
    correctAnswer: 'a' | 'b' | 'c' | 'd';
    difficulty: QuestionDifficulty;
    explanation?: string;
    timeLimit: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface IAssessment extends Document {
    userId: string;
    currentStep: AssessmentStep;
    step1: {
        questions: string[];
        answers: {
            questionId: string;
            answer: string;
            timeSpent: number;
        }[];
        score: number;
        percentage: number;
        completedAt?: Date;
        startedAt?: Date;
    };
    step2: {
        questions: string[];
        answers: {
            questionId: string;
            answer: string;
            timeSpent: number;
        }[];
        score: number;
        percentage: number;
        completedAt?: Date;
        startedAt?: Date;
    };
    step3: {
        questions: string[];
        answers: {
            questionId: string;
            answer: string;
            timeSpent: number;
        }[];
        score: number;
        percentage: number;
        completedAt?: Date;
        startedAt?: Date;
    };
    finalLevel: CompetencyLevel | null;
    certificateUrl?: string;
    certificateGeneratedAt?: Date;
    isCompleted: boolean;
    totalTimeSpent: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface ICertificate extends Document {
    userId: string;
    assessmentId: string;
    certificateNumber: string;
    level: CompetencyLevel;
    issuedDate: Date;
    validUntil?: Date;
    pdfUrl?: string;
    verificationCode: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: UserRole;
    };
}
export interface TokenPayload {
    id: string;
    email: string;
    role: UserRole;
}
export interface PaginationParams {
    page: number;
    limit: number;
    sort?: string;
    order?: 'asc' | 'desc';
}
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
//# sourceMappingURL=index.d.ts.map