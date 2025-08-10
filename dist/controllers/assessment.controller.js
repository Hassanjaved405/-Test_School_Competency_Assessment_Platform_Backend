"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssessmentHistory = exports.getAssessmentStatus = exports.submitStepAnswers = exports.getStepQuestions = exports.startAssessment = void 0;
const Assessment_model_1 = __importDefault(require("../models/Assessment.model"));
const Question_model_1 = __importDefault(require("../models/Question.model"));
const Certificate_model_1 = __importDefault(require("../models/Certificate.model"));
const types_1 = require("../types");
const error_middleware_1 = require("../middleware/error.middleware");
const email_utils_1 = require("../utils/email.utils");
const User_model_1 = __importDefault(require("../models/User.model"));
const startAssessment = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        let assessment = await Assessment_model_1.default.findOne({
            userId,
            isCompleted: false
        });
        if (assessment) {
            res.status(200).json({
                success: true,
                message: 'Continuing existing assessment',
                data: { assessment }
            });
            return;
        }
        const existingCompleted = await Assessment_model_1.default.findOne({
            userId,
            isCompleted: true,
            'step1.percentage': { $lt: 25 }
        });
        if (existingCompleted) {
            throw new error_middleware_1.AppError('You failed Step 1 and cannot retake the assessment', 403);
        }
        assessment = await Assessment_model_1.default.create({
            userId,
            currentStep: types_1.AssessmentStep.STEP_1
        });
        res.status(201).json({
            success: true,
            message: 'Assessment started successfully',
            data: { assessment }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.startAssessment = startAssessment;
const getStepQuestions = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const step = parseInt(req.params.step);
        if (![1, 2, 3].includes(step)) {
            throw new error_middleware_1.AppError('Invalid step number', 400);
        }
        const assessment = await Assessment_model_1.default.findOne({ userId, isCompleted: false });
        if (!assessment) {
            throw new error_middleware_1.AppError('No active assessment found', 404);
        }
        if (step > assessment.currentStep) {
            throw new error_middleware_1.AppError('You cannot access this step yet', 403);
        }
        if (step < assessment.currentStep) {
            throw new error_middleware_1.AppError('You have already completed this step', 400);
        }
        const stepKey = `step${step}`;
        if (assessment[stepKey].questions.length === 0) {
            let levels = [];
            if (step === 1) {
                levels = [types_1.CompetencyLevel.A1, types_1.CompetencyLevel.A2];
            }
            else if (step === 2) {
                levels = [types_1.CompetencyLevel.B1, types_1.CompetencyLevel.B2];
            }
            else {
                levels = [types_1.CompetencyLevel.C1, types_1.CompetencyLevel.C2];
            }
            const questions = await Question_model_1.default.aggregate([
                { $match: { level: { $in: levels }, isActive: true } },
                { $sample: { size: 44 } }
            ]);
            if (questions.length < 44) {
                throw new error_middleware_1.AppError('Not enough questions available for this step', 500);
            }
            assessment[stepKey].questions = questions.map(q => q._id);
            assessment[stepKey].startedAt = new Date();
            await assessment.save();
        }
        const questions = await Question_model_1.default.find({
            _id: { $in: assessment[stepKey].questions }
        }).select('-correctAnswer -explanation');
        res.status(200).json({
            success: true,
            data: {
                step,
                questions,
                startedAt: assessment[stepKey].startedAt,
                timePerQuestion: 60
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getStepQuestions = getStepQuestions;
const submitStepAnswers = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const step = parseInt(req.params.step);
        const { answers } = req.body;
        if (![1, 2, 3].includes(step)) {
            throw new error_middleware_1.AppError('Invalid step number', 400);
        }
        const assessment = await Assessment_model_1.default.findOne({ userId, isCompleted: false });
        if (!assessment) {
            throw new error_middleware_1.AppError('No active assessment found', 404);
        }
        if (step !== assessment.currentStep) {
            throw new error_middleware_1.AppError('Invalid step submission', 400);
        }
        const stepKey = `step${step}`;
        const questions = await Question_model_1.default.find({
            _id: { $in: assessment[stepKey].questions }
        });
        let correctAnswers = 0;
        const processedAnswers = answers.map((answer) => {
            const question = questions.find(q => q._id.toString() === answer.questionId);
            if (question && question.correctAnswer === answer.answer) {
                correctAnswers++;
            }
            return {
                questionId: answer.questionId,
                answer: answer.answer || '',
                timeSpent: answer.timeSpent || 0
            };
        });
        if (questions.length === 0) {
            throw new error_middleware_1.AppError('No questions found for assessment', 500);
        }
        const percentage = Math.round((correctAnswers / questions.length) * 100 * 100) / 100;
        assessment[stepKey].answers = processedAnswers;
        assessment[stepKey].score = correctAnswers;
        assessment[stepKey].percentage = percentage;
        assessment[stepKey].completedAt = new Date();
        let proceedToNext = false;
        let finalLevel = null;
        if (step === 1) {
            if (percentage < 25) {
                assessment.isCompleted = true;
                assessment.finalLevel = null;
            }
            else if (percentage < 50) {
                finalLevel = types_1.CompetencyLevel.A1;
                assessment.finalLevel = finalLevel;
                assessment.isCompleted = true;
            }
            else if (percentage < 75) {
                finalLevel = types_1.CompetencyLevel.A2;
                assessment.finalLevel = finalLevel;
                assessment.isCompleted = true;
            }
            else {
                finalLevel = types_1.CompetencyLevel.A2;
                assessment.finalLevel = finalLevel;
                proceedToNext = true;
                assessment.currentStep = types_1.AssessmentStep.STEP_2;
            }
        }
        else if (step === 2) {
            if (percentage < 25) {
                finalLevel = assessment.finalLevel || types_1.CompetencyLevel.A2;
                assessment.isCompleted = true;
            }
            else if (percentage < 50) {
                finalLevel = types_1.CompetencyLevel.B1;
                assessment.finalLevel = finalLevel;
                assessment.isCompleted = true;
            }
            else if (percentage < 75) {
                finalLevel = types_1.CompetencyLevel.B2;
                assessment.finalLevel = finalLevel;
                assessment.isCompleted = true;
            }
            else {
                finalLevel = types_1.CompetencyLevel.B2;
                assessment.finalLevel = finalLevel;
                proceedToNext = true;
                assessment.currentStep = types_1.AssessmentStep.STEP_3;
            }
        }
        else {
            if (percentage < 25) {
                finalLevel = types_1.CompetencyLevel.B2;
            }
            else if (percentage < 50) {
                finalLevel = types_1.CompetencyLevel.C1;
            }
            else {
                finalLevel = types_1.CompetencyLevel.C2;
            }
            assessment.finalLevel = finalLevel;
            assessment.isCompleted = true;
        }
        const totalTime = assessment.step1.answers.reduce((acc, ans) => acc + ans.timeSpent, 0) +
            assessment.step2.answers.reduce((acc, ans) => acc + ans.timeSpent, 0) +
            assessment.step3.answers.reduce((acc, ans) => acc + ans.timeSpent, 0);
        assessment.totalTimeSpent = totalTime;
        await assessment.save();
        if (assessment.isCompleted && finalLevel) {
            const certificate = await Certificate_model_1.default.create({
                userId,
                assessmentId: assessment._id,
                level: finalLevel
            });
            const user = await User_model_1.default.findById(userId);
            if (user) {
                await (0, email_utils_1.sendCertificateEmail)(user.email, user.firstName, finalLevel, certificate.certificateNumber);
            }
        }
        res.status(200).json({
            success: true,
            message: `Step ${step} completed`,
            data: {
                score: correctAnswers,
                totalQuestions: questions.length,
                percentage,
                finalLevel,
                proceedToNext,
                isCompleted: assessment.isCompleted
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.submitStepAnswers = submitStepAnswers;
const getAssessmentStatus = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const assessment = await Assessment_model_1.default.findOne({ userId })
            .sort({ createdAt: -1 })
            .populate('step1.questions', 'questionText level competency')
            .populate('step2.questions', 'questionText level competency')
            .populate('step3.questions', 'questionText level competency');
        if (!assessment) {
            res.status(200).json({
                success: true,
                data: { hasAssessment: false }
            });
            return;
        }
        const certificate = assessment.isCompleted && assessment.finalLevel
            ? await Certificate_model_1.default.findOne({ assessmentId: assessment._id })
            : null;
        res.status(200).json({
            success: true,
            data: {
                hasAssessment: true,
                assessment,
                certificate
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAssessmentStatus = getAssessmentStatus;
const getAssessmentHistory = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const { page = 1, limit = 10 } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const total = await Assessment_model_1.default.countDocuments({ userId });
        const assessments = await Assessment_model_1.default.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)
            .select('currentStep finalLevel isCompleted totalTimeSpent createdAt updatedAt');
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
exports.getAssessmentHistory = getAssessmentHistory;
//# sourceMappingURL=assessment.controller.js.map