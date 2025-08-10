"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.resetPassword = exports.forgotPassword = exports.logout = exports.refreshToken = exports.login = exports.resendOTP = exports.verifyOTP = exports.register = void 0;
const crypto_1 = __importDefault(require("crypto"));
const User_model_1 = __importDefault(require("../models/User.model"));
const jwt_utils_1 = require("../utils/jwt.utils");
const email_utils_1 = require("../utils/email.utils");
const error_middleware_1 = require("../middleware/error.middleware");
const types_1 = require("../types");
const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, role = types_1.UserRole.STUDENT } = req.body;
        const existingUser = await User_model_1.default.findOne({ email });
        if (existingUser) {
            throw new error_middleware_1.AppError('Email already registered', 400);
        }
        const user = await User_model_1.default.create({
            firstName,
            lastName,
            email,
            password,
            role
        });
        const otp = user.generateOTP();
        await user.save();
        // Send OTP email (will log to console in dev if not configured)
        await (0, email_utils_1.sendOTPEmail)(email, otp, firstName);
        res.status(201).json({
            success: true,
            message: 'Registration successful. Please verify your email with the OTP sent.',
            data: {
                userId: user._id,
                email: user.email
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const hashedOTP = crypto_1.default.createHash('sha256').update(otp).digest('hex');
        const user = await User_model_1.default.findOne({
            email,
            otp: hashedOTP,
            otpExpires: { $gt: Date.now() }
        }).select('+otp +otpExpires +otpAttempts');
        if (!user) {
            const attemptUser = await User_model_1.default.findOne({ email }).select('+otpAttempts');
            if (attemptUser) {
                attemptUser.otpAttempts = (attemptUser.otpAttempts || 0) + 1;
                await attemptUser.save();
                if (attemptUser.otpAttempts >= 5) {
                    throw new error_middleware_1.AppError('Too many failed attempts. Please request a new OTP.', 429);
                }
            }
            throw new error_middleware_1.AppError('Invalid or expired OTP', 400);
        }
        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        user.otpAttempts = 0;
        await user.save();
        await (0, email_utils_1.sendWelcomeEmail)(user.email, user.firstName);
        const tokens = (0, jwt_utils_1.generateTokenPair)({
            id: user._id.toString(),
            email: user.email,
            role: user.role
        });
        user.refreshToken = tokens.refreshToken;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            data: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                },
                tokens
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyOTP = verifyOTP;
const resendOTP = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User_model_1.default.findOne({ email });
        if (!user) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        if (user.isEmailVerified) {
            throw new error_middleware_1.AppError('Email already verified', 400);
        }
        const otp = user.generateOTP();
        await user.save();
        await (0, email_utils_1.sendOTPEmail)(email, otp, user.firstName);
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.resendOTP = resendOTP;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User_model_1.default.findOne({ email }).select('+password +refreshToken');
        if (!user || !(await user.comparePassword(password))) {
            throw new error_middleware_1.AppError('Invalid email or password', 401);
        }
        if (!user.isEmailVerified) {
            throw new error_middleware_1.AppError('Please verify your email first', 403);
        }
        if (!user.isActive) {
            throw new error_middleware_1.AppError('Your account has been deactivated', 403);
        }
        const tokens = (0, jwt_utils_1.generateTokenPair)({
            id: user._id.toString(),
            email: user.email,
            role: user.role
        });
        user.refreshToken = tokens.refreshToken;
        user.lastLogin = new Date();
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                },
                tokens
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw new error_middleware_1.AppError('Refresh token is required', 400);
        }
        const decoded = (0, jwt_utils_1.verifyRefreshToken)(refreshToken);
        const user = await User_model_1.default.findById(decoded.id).select('+refreshToken');
        if (!user || user.refreshToken !== refreshToken) {
            throw new error_middleware_1.AppError('Invalid refresh token', 401);
        }
        const tokens = (0, jwt_utils_1.generateTokenPair)({
            id: user._id.toString(),
            email: user.email,
            role: user.role
        });
        user.refreshToken = tokens.refreshToken;
        await user.save();
        res.status(200).json({
            success: true,
            data: { tokens }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.refreshToken = refreshToken;
const logout = async (req, res, next) => {
    try {
        if (req.user) {
            await User_model_1.default.findByIdAndUpdate(req.user.id, { refreshToken: null });
        }
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User_model_1.default.findOne({ email });
        if (!user) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const hashedToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save();
        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        await (0, email_utils_1.sendPasswordResetEmail)(email, resetUrl, user.firstName);
        res.status(200).json({
            success: true,
            message: 'Password reset link sent to your email'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        const hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
        const user = await User_model_1.default.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        }).select('+passwordResetToken +passwordResetExpires');
        if (!user) {
            throw new error_middleware_1.AppError('Invalid or expired reset token', 400);
        }
        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Password reset successful'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
const getProfile = async (req, res, next) => {
    try {
        const user = await User_model_1.default.findById(req.user?.id);
        if (!user) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        res.status(200).json({
            success: true,
            data: { user }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res, next) => {
    try {
        const { firstName, lastName } = req.body;
        const user = await User_model_1.default.findByIdAndUpdate(req.user?.id, { firstName, lastName }, { new: true, runValidators: true });
        if (!user) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: { user }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=auth.controller.js.map