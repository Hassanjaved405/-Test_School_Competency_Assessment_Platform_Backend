import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import User from '../models/User.model';
import { generateTokenPair, verifyRefreshToken } from '../utils/jwt.utils';
import { sendOTPEmail, sendPasswordResetEmail, sendWelcomeEmail } from '../utils/email.utils';
import { AppError } from '../middleware/error.middleware';
import { AuthRequest, UserRole } from '../types';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, email, password, role = UserRole.STUDENT } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }
    
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role
    });
    
    const otp = user.generateOTP();
    await user.save();
    
    // Send OTP email (will log to console in dev if not configured)
    await sendOTPEmail(email, otp, firstName);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email with the OTP sent.',
      data: {
        userId: user._id,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, otp } = req.body;
    
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
    
    const user = await User.findOne({
      email,
      otp: hashedOTP,
      otpExpires: { $gt: Date.now() }
    }).select('+otp +otpExpires +otpAttempts');
    
    if (!user) {
      const attemptUser = await User.findOne({ email }).select('+otpAttempts');
      if (attemptUser) {
        attemptUser.otpAttempts = (attemptUser.otpAttempts || 0) + 1;
        await attemptUser.save();
        
        if (attemptUser.otpAttempts >= 5) {
          throw new AppError('Too many failed attempts. Please request a new OTP.', 429);
        }
      }
      throw new AppError('Invalid or expired OTP', 400);
    }
    
    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.otpAttempts = 0;
    await user.save();
    
    await sendWelcomeEmail(user.email, user.firstName);
    
    const tokens = generateTokenPair({
      id: (user._id as any).toString(),
      email: user.email,
      role: user.role as UserRole
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
  } catch (error) {
    next(error);
  }
};

export const resendOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    if (user.isEmailVerified) {
      throw new AppError('Email already verified', 400);
    }
    
    const otp = user.generateOTP();
    await user.save();
    
    await sendOTPEmail(email, otp, user.firstName);
    
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password +refreshToken');
    
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Invalid email or password', 401);
    }
    
    if (!user.isEmailVerified) {
      throw new AppError('Please verify your email first', 403);
    }
    
    if (!user.isActive) {
      throw new AppError('Your account has been deactivated', 403);
    }
    
    const tokens = generateTokenPair({
      id: (user._id as any).toString(),
      email: user.email,
      role: user.role as UserRole
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
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      throw new AppError('Refresh token is required', 400);
    }
    
    const decoded = verifyRefreshToken(refreshToken);
    
    const user = await User.findById(decoded.id).select('+refreshToken');
    
    if (!user || user.refreshToken !== refreshToken) {
      throw new AppError('Invalid refresh token', 401);
    }
    
    const tokens = generateTokenPair({
      id: (user._id as any).toString(),
      email: user.email,
      role: user.role as UserRole
    });
    
    user.refreshToken = tokens.refreshToken;
    await user.save();
    
    res.status(200).json({
      success: true,
      data: { tokens }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
    }
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();
    
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(email, resetUrl, user.firstName);
    
    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email'
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token, newPassword } = req.body;
    
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    }).select('+passwordResetToken +passwordResetExpires');
    
    if (!user) {
      throw new AppError('Invalid or expired reset token', 400);
    }
    
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id);
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user?.id,
      { firstName, lastName },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};