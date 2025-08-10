import { Response, NextFunction } from 'express';
import User from '../models/User.model';
import Assessment from '../models/Assessment.model';
import Question from '../models/Question.model';
import Certificate from '../models/Certificate.model';
import { AuthRequest, UserRole } from '../types';
import { AppError } from '../middleware/error.middleware';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10, role, search, isActive } = req.query;
    
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    const query: Record<string, any> = {};
    
    if (role && Object.values(UserRole).includes(role as UserRole)) {
      query.role = role;
    }
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const total = await User.countDocuments(query);
    
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-password -refreshToken');
    
    res.status(200).json({
      success: true,
      data: { users },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id).select('-password -refreshToken');
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    const assessments = await Assessment.find({ userId: id })
      .sort({ createdAt: -1 })
      .limit(5);
    
    const certificates = await Certificate.find({ userId: id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        user,
        assessments,
        certificates
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    res.status(200).json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!Object.values(UserRole).includes(role)) {
      throw new AppError('Invalid role', 400);
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (id === req.user?.id) {
      throw new AppError('You cannot delete your own account', 400);
    }
    
    const user = await User.findById(id);
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    if (user.role === UserRole.ADMIN) {
      const adminCount = await User.countDocuments({ role: UserRole.ADMIN });
      if (adminCount <= 1) {
        throw new AppError('Cannot delete the last admin user', 400);
      }
    }
    
    await Assessment.deleteMany({ userId: id });
    await Certificate.deleteMany({ userId: id });
    await user.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'User and related data deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalAssessments = await Assessment.countDocuments();
    const completedAssessments = await Assessment.countDocuments({ isCompleted: true });
    const totalCertificates = await Certificate.countDocuments();
    const totalQuestions = await Question.countDocuments();
    
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const certificatesByLevel = await Certificate.aggregate([
      {
        $group: {
          _id: '$level',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const recentAssessments = await Assessment.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('userId', 'firstName lastName email');
    
    const passRate = completedAssessments > 0
      ? await Assessment.countDocuments({ 
          isCompleted: true, 
          finalLevel: { $ne: null } 
        }) / completedAssessments * 100
      : 0;
    
    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          activeUsers,
          totalAssessments,
          completedAssessments,
          totalCertificates,
          totalQuestions,
          passRate: passRate.toFixed(2)
        },
        usersByRole,
        certificatesByLevel,
        recentAssessments
      }
    });
  } catch (error) {
    next(error);
  }
};

// Create a new user (admin can create users with any role)
export const createUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, email, password, role = UserRole.STUDENT } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already exists', 400);
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      isEmailVerified: true, // Admin-created users are pre-verified
      isActive: true
    });
    
    const userResponse: any = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { user: userResponse }
    });
  } catch (error) {
    next(error);
  }
};

// Update user details
export const updateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, role, isActive } = req.body;
    
    const user = await User.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email, _id: { $ne: id } });
      if (existingEmail) {
        throw new AppError('Email already exists', 400);
      }
    }
    
    const updates: any = {};
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (email) updates.email = email;
    if (role) updates.role = role;
    if (isActive !== undefined) updates.isActive = isActive;
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).select('-password -refreshToken');
    
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: { user: updatedUser }
    });
  } catch (error) {
    next(error);
  }
};

// Reset user password
export const resetUserPassword = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    
    if (!newPassword || newPassword.length < 6) {
      throw new AppError('Password must be at least 6 characters', 400);
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const user = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    ).select('-password -refreshToken');
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Delete assessment for a user
export const deleteUserAssessment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;
    
    const assessment = await Assessment.findOne({ userId });
    if (!assessment) {
      throw new AppError('No assessment found for this user', 404);
    }
    
    await Assessment.deleteOne({ userId });
    await Certificate.deleteMany({ userId });
    
    res.status(200).json({
      success: true,
      message: 'Assessment and certificates deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getAssessmentReports = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10, userId, isCompleted, level, dateFrom, dateTo } = req.query;
    
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    const query: any = {};
    
    if (userId) {
      query.userId = userId;
    }
    
    if (isCompleted !== undefined) {
      query.isCompleted = isCompleted === 'true';
    }
    
    if (level) {
      query.finalLevel = level;
    }
    
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) {
        query.createdAt.$gte = new Date(dateFrom as string);
      }
      if (dateTo) {
        query.createdAt.$lte = new Date(dateTo as string);
      }
    }
    
    const total = await Assessment.countDocuments(query);
    
    const assessments = await Assessment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('userId', 'firstName lastName email');
    
    res.status(200).json({
      success: true,
      data: { assessments },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
};