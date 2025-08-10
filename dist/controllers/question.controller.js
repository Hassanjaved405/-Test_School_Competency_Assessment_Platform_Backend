"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionStats = exports.bulkCreateQuestions = exports.deleteQuestion = exports.updateQuestion = exports.createQuestion = exports.getQuestionById = exports.getAllQuestions = void 0;
const Question_model_1 = __importDefault(require("../models/Question.model"));
const error_middleware_1 = require("../middleware/error.middleware");
const getAllQuestions = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, competency, level, difficulty, isActive } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const query = {};
        if (competency) {
            query.competency = { $regex: competency, $options: 'i' };
        }
        if (level) {
            query.level = level;
        }
        if (difficulty) {
            query.difficulty = difficulty;
        }
        if (isActive !== undefined) {
            query.isActive = isActive === 'true';
        }
        const total = await Question_model_1.default.countDocuments(query);
        const questions = await Question_model_1.default.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);
        res.status(200).json({
            success: true,
            data: { questions },
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
exports.getAllQuestions = getAllQuestions;
const getQuestionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const question = await Question_model_1.default.findById(id);
        if (!question) {
            throw new error_middleware_1.AppError('Question not found', 404);
        }
        res.status(200).json({
            success: true,
            data: { question }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getQuestionById = getQuestionById;
const createQuestion = async (req, res, next) => {
    try {
        const questionData = req.body;
        const question = await Question_model_1.default.create(questionData);
        res.status(201).json({
            success: true,
            message: 'Question created successfully',
            data: { question }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createQuestion = createQuestion;
const updateQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const question = await Question_model_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!question) {
            throw new error_middleware_1.AppError('Question not found', 404);
        }
        res.status(200).json({
            success: true,
            message: 'Question updated successfully',
            data: { question }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateQuestion = updateQuestion;
const deleteQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const question = await Question_model_1.default.findByIdAndDelete(id);
        if (!question) {
            throw new error_middleware_1.AppError('Question not found', 404);
        }
        res.status(200).json({
            success: true,
            message: 'Question deleted successfully'
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteQuestion = deleteQuestion;
const bulkCreateQuestions = async (req, res, next) => {
    try {
        const { questions } = req.body;
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new error_middleware_1.AppError('Questions array is required', 400);
        }
        const createdQuestions = await Question_model_1.default.insertMany(questions, {
            ordered: false,
            rawResult: false
        });
        res.status(201).json({
            success: true,
            message: `${createdQuestions.length} questions created successfully`,
            data: {
                count: createdQuestions.length,
                questions: createdQuestions
            }
        });
    }
    catch (error) {
        if (error.code === 11000) {
            next(new error_middleware_1.AppError('Duplicate questions found', 400));
        }
        else {
            next(error);
        }
    }
};
exports.bulkCreateQuestions = bulkCreateQuestions;
const getQuestionStats = async (req, res, next) => {
    try {
        const stats = await Question_model_1.default.aggregate([
            {
                $group: {
                    _id: {
                        level: '$level',
                        competency: '$competency'
                    },
                    count: { $sum: 1 },
                    activeCount: {
                        $sum: { $cond: ['$isActive', 1, 0] }
                    }
                }
            },
            {
                $group: {
                    _id: '$_id.level',
                    competencies: {
                        $push: {
                            competency: '$_id.competency',
                            count: '$count',
                            activeCount: '$activeCount'
                        }
                    },
                    totalCount: { $sum: '$count' },
                    totalActiveCount: { $sum: '$activeCount' }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        const totalQuestions = await Question_model_1.default.countDocuments();
        const activeQuestions = await Question_model_1.default.countDocuments({ isActive: true });
        const competencyList = await Question_model_1.default.distinct('competency');
        res.status(200).json({
            success: true,
            data: {
                totalQuestions,
                activeQuestions,
                totalCompetencies: competencyList.length,
                levelStats: stats,
                competencies: competencyList
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getQuestionStats = getQuestionStats;
//# sourceMappingURL=question.controller.js.map