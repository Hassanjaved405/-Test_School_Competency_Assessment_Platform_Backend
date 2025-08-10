"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const questionController = __importStar(require("../controllers/question.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const types_1 = require("../types");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', questionController.getAllQuestions);
router.get('/stats', questionController.getQuestionStats);
router.get('/:id', [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid question ID'),
    validation_middleware_1.validateRequest
], questionController.getQuestionById);
router.use((0, auth_middleware_1.authorize)(types_1.UserRole.ADMIN));
router.post('/', [
    (0, express_validator_1.body)('competency').trim().notEmpty().withMessage('Competency is required'),
    (0, express_validator_1.body)('level').isIn(Object.values(types_1.CompetencyLevel)).withMessage('Invalid level'),
    (0, express_validator_1.body)('questionText').trim().notEmpty().withMessage('Question text is required'),
    (0, express_validator_1.body)('options.a').trim().notEmpty().withMessage('Option A is required'),
    (0, express_validator_1.body)('options.b').trim().notEmpty().withMessage('Option B is required'),
    (0, express_validator_1.body)('options.c').trim().notEmpty().withMessage('Option C is required'),
    (0, express_validator_1.body)('options.d').trim().notEmpty().withMessage('Option D is required'),
    (0, express_validator_1.body)('correctAnswer').isIn(['a', 'b', 'c', 'd']).withMessage('Invalid correct answer'),
    (0, express_validator_1.body)('difficulty').optional().isIn(Object.values(types_1.QuestionDifficulty)).withMessage('Invalid difficulty'),
    (0, express_validator_1.body)('timeLimit').optional().isInt({ min: 30, max: 300 }).withMessage('Time limit must be between 30 and 300 seconds'),
    validation_middleware_1.validateRequest
], questionController.createQuestion);
router.put('/:id', [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid question ID'),
    (0, express_validator_1.body)('competency').optional().trim().notEmpty().withMessage('Competency cannot be empty'),
    (0, express_validator_1.body)('level').optional().isIn(Object.values(types_1.CompetencyLevel)).withMessage('Invalid level'),
    (0, express_validator_1.body)('questionText').optional().trim().notEmpty().withMessage('Question text cannot be empty'),
    (0, express_validator_1.body)('correctAnswer').optional().isIn(['a', 'b', 'c', 'd']).withMessage('Invalid correct answer'),
    (0, express_validator_1.body)('difficulty').optional().isIn(Object.values(types_1.QuestionDifficulty)).withMessage('Invalid difficulty'),
    (0, express_validator_1.body)('timeLimit').optional().isInt({ min: 30, max: 300 }).withMessage('Time limit must be between 30 and 300 seconds'),
    validation_middleware_1.validateRequest
], questionController.updateQuestion);
router.delete('/:id', [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid question ID'),
    validation_middleware_1.validateRequest
], questionController.deleteQuestion);
router.post('/bulk', [
    (0, express_validator_1.body)('questions').isArray({ min: 1 }).withMessage('Questions array is required'),
    (0, express_validator_1.body)('questions.*.competency').trim().notEmpty().withMessage('Competency is required'),
    (0, express_validator_1.body)('questions.*.level').isIn(Object.values(types_1.CompetencyLevel)).withMessage('Invalid level'),
    (0, express_validator_1.body)('questions.*.questionText').trim().notEmpty().withMessage('Question text is required'),
    (0, express_validator_1.body)('questions.*.options.a').trim().notEmpty().withMessage('Option A is required'),
    (0, express_validator_1.body)('questions.*.options.b').trim().notEmpty().withMessage('Option B is required'),
    (0, express_validator_1.body)('questions.*.options.c').trim().notEmpty().withMessage('Option C is required'),
    (0, express_validator_1.body)('questions.*.options.d').trim().notEmpty().withMessage('Option D is required'),
    (0, express_validator_1.body)('questions.*.correctAnswer').isIn(['a', 'b', 'c', 'd']).withMessage('Invalid correct answer'),
    validation_middleware_1.validateRequest
], questionController.bulkCreateQuestions);
exports.default = router;
//# sourceMappingURL=question.routes.js.map