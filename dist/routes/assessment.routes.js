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
const assessmentController = __importStar(require("../controllers/assessment.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.post('/start', assessmentController.startAssessment);
router.get('/status', assessmentController.getAssessmentStatus);
router.get('/history', assessmentController.getAssessmentHistory);
router.get('/step/:step/questions', [
    (0, express_validator_1.param)('step').isInt({ min: 1, max: 3 }).withMessage('Step must be 1, 2, or 3'),
    validation_middleware_1.validateRequest
], assessmentController.getStepQuestions);
router.post('/step/:step/submit', [
    (0, express_validator_1.param)('step').isInt({ min: 1, max: 3 }).withMessage('Step must be 1, 2, or 3'),
    (0, express_validator_1.body)('answers').isArray().withMessage('Answers must be an array'),
    (0, express_validator_1.body)('answers.*.questionId').notEmpty().withMessage('Question ID is required'),
    (0, express_validator_1.body)('answers.*.answer').optional().isIn(['a', 'b', 'c', 'd', '']).withMessage('Invalid answer option'),
    (0, express_validator_1.body)('answers.*.timeSpent').optional().isInt({ min: 0 }).withMessage('Time spent must be a positive integer'),
    validation_middleware_1.validateRequest
], assessmentController.submitStepAnswers);
exports.default = router;
//# sourceMappingURL=assessment.routes.js.map