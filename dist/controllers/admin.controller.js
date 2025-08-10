"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssessmentReports = exports.deleteUserAssessment = exports.resetUserPassword = exports.updateUser = exports.createUser = exports.getDashboardStats = exports.deleteUser = exports.updateUserRole = exports.updateUserStatus = exports.getUserById = exports.getAllUsers = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const Assessment_model_1 = __importDefault(require("../models/Assessment.model"));
const Question_model_1 = __importDefault(require("../models/Question.model"));
const Certificate_model_1 = __importDefault(require("../models/Certificate.model"));
const types_1 = require("../types");
const error_middleware_1 = require("../middleware/error.middleware");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, role, search, isActive } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const query = {};
        if (role && Object.values(types_1.UserRole).includes(role)) {
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
        const total = await User_model_1.default.countDocuments(query);
        const users = await User_model_1.default.find(query)
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
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User_model_1.default.findById(id).select('-password -refreshToken');
        if (!user) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        const assessments = await Assessment_model_1.default.find({ userId: id })
            .sort({ createdAt: -1 })
            .limit(5);
        const certificates = await Certificate_model_1.default.find({ userId: id })
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: {
                user,
                assessments,
                certificates
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
const updateUserStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        const user = await User_model_1.default.findByIdAndUpdate(id, { isActive }, { new: true, runValidators: true }).select('-password -refreshToken');
        if (!user) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        res.status(200).json({
            success: true,
            message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
            data: { user }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserStatus = updateUserStatus;
const updateUserRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!Object.values(types_1.UserRole).includes(role)) {
            throw new error_middleware_1.AppError('Invalid role', 400);
        }
        const user = await User_model_1.default.findByIdAndUpdate(id, { role }, { new: true, runValidators: true }).select('-password -refreshToken');
        if (!user) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        res.status(200).json({
            success: true,
            message: 'User role updated successfully',
            data: { user }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserRole = updateUserRole;
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (id === req.user?.id) {
            throw new error_middleware_1.AppError('You cannot delete your own account', 400);
        }
        const user = await User_model_1.default.findById(id);
        if (!user) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        if (user.role === types_1.UserRole.ADMIN) {
            const adminCount = await User_model_1.default.countDocuments({ role: types_1.UserRole.ADMIN });
            if (adminCount <= 1) {
                throw new error_middleware_1.AppError('Cannot delete the last admin user', 400);
            }
        }
        await Assessment_model_1.default.deleteMany({ userId: id });
        await Certificate_model_1.default.deleteMany({ userId: id });
        await user.deleteOne();
        res.status(200).json({
            success: true,
            message: 'User and related data deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
const getDashboardStats = async (req, res, next) => {
    try {
        const totalUsers = await User_model_1.default.countDocuments();
        const activeUsers = await User_model_1.default.countDocuments({ isActive: true });
        const totalAssessments = await Assessment_model_1.default.countDocuments();
        const completedAssessments = await Assessment_model_1.default.countDocuments({ isCompleted: true });
        const totalCertificates = await Certificate_model_1.default.countDocuments();
        const totalQuestions = await Question_model_1.default.countDocuments();
        const usersByRole = await User_model_1.default.aggregate([
            {
                $group: {
                    _id: '$role',
                    count: { $sum: 1 }
                }
            }
        ]);
        const certificatesByLevel = await Certificate_model_1.default.aggregate([
            {
                $group: {
                    _id: '$level',
                    count: { $sum: 1 }
                }
            }
        ]);
        const recentAssessments = await Assessment_model_1.default.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('userId', 'firstName lastName email');
        const passRate = completedAssessments > 0
            ? await Assessment_model_1.default.countDocuments({
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
    }
    catch (error) {
        next(error);
    }
};
exports.getDashboardStats = getDashboardStats;
// Create a new user (admin can create users with any role)
const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, role = types_1.UserRole.STUDENT } = req.body;
        const existingUser = await User_model_1.default.findOne({ email });
        if (existingUser) {
            throw new error_middleware_1.AppError('Email already exists', 400);
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_model_1.default.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            isEmailVerified: true, // Admin-created users are pre-verified
            isActive: true
        });
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: { user: userResponse }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
// Update user details
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, role, isActive } = req.body;
        const user = await User_model_1.default.findById(id);
        if (!user) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        if (email && email !== user.email) {
            const existingEmail = await User_model_1.default.findOne({ email, _id: { $ne: id } });
            if (existingEmail) {
                throw new error_middleware_1.AppError('Email already exists', 400);
            }
        }
        const updates = {};
        if (firstName)
            updates.firstName = firstName;
        if (lastName)
            updates.lastName = lastName;
        if (email)
            updates.email = email;
        if (role)
            updates.role = role;
        if (isActive !== undefined)
            updates.isActive = isActive;
        const updatedUser = await User_model_1.default.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).select('-password -refreshToken');
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: { user: updatedUser }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
// Reset user password
const resetUserPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        if (!newPassword || newPassword.length < 6) {
            throw new error_middleware_1.AppError('Password must be at least 6 characters', 400);
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        const user = await User_model_1.default.findByIdAndUpdate(id, { password: hashedPassword }, { new: true }).select('-password -refreshToken');
        if (!user) {
            throw new error_middleware_1.AppError('User not found', 404);
        }
        res.status(200).json({
            success: true,
            message: 'Password reset successfully',
            data: { user }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.resetUserPassword = resetUserPassword;
// Delete assessment for a user
const deleteUserAssessment = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const assessment = await Assessment_model_1.default.findOne({ userId });
        if (!assessment) {
            throw new error_middleware_1.AppError('No assessment found for this user', 404);
        }
        await Assessment_model_1.default.deleteOne({ userId });
        await Certificate_model_1.default.deleteMany({ userId });
        res.status(200).json({
            success: true,
            message: 'Assessment and certificates deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUserAssessment = deleteUserAssessment;
const getAssessmentReports = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, userId, isCompleted, level, dateFrom, dateTo } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const query = {};
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
                query.createdAt.$gte = new Date(dateFrom);
            }
            if (dateTo) {
                query.createdAt.$lte = new Date(dateTo);
            }
        }
        const total = await Assessment_model_1.default.countDocuments(query);
        const assessments = await Assessment_model_1.default.find(query)
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
    }
    catch (error) {
        next(error);
    }
};
exports.getAssessmentReports = getAssessmentReports;
//# sourceMappingURL=admin.controller.js.map