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
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("../types");
const answerSchema = new mongoose_1.Schema({
    questionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    answer: {
        type: String,
        enum: ['a', 'b', 'c', 'd', ''],
        default: ''
    },
    timeSpent: {
        type: Number,
        default: 0
    }
}, { _id: false });
const stepSchema = new mongoose_1.Schema({
    questions: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Question'
        }],
    answers: [answerSchema],
    score: {
        type: Number,
        default: 0
    },
    percentage: {
        type: Number,
        default: 0
    },
    startedAt: Date,
    completedAt: Date
}, { _id: false });
const assessmentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    currentStep: {
        type: Number,
        enum: [1, 2, 3],
        default: types_1.AssessmentStep.STEP_1
    },
    step1: {
        type: stepSchema,
        default: () => ({
            questions: [],
            answers: [],
            score: 0,
            percentage: 0
        })
    },
    step2: {
        type: stepSchema,
        default: () => ({
            questions: [],
            answers: [],
            score: 0,
            percentage: 0
        })
    },
    step3: {
        type: stepSchema,
        default: () => ({
            questions: [],
            answers: [],
            score: 0,
            percentage: 0
        })
    },
    finalLevel: {
        type: String,
        enum: [...Object.values(types_1.CompetencyLevel), null],
        default: null
    },
    certificateUrl: String,
    certificateGeneratedAt: Date,
    isCompleted: {
        type: Boolean,
        default: false
    },
    totalTimeSpent: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (_doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});
assessmentSchema.index({ userId: 1 });
assessmentSchema.index({ isCompleted: 1 });
assessmentSchema.index({ finalLevel: 1 });
assessmentSchema.methods.calculateStepResult = function (step) {
    const stepData = this[`step${step}`];
    const percentage = stepData.percentage;
    if (step === 1) {
        if (percentage < 25)
            return null;
        if (percentage < 50)
            return types_1.CompetencyLevel.A1;
        return types_1.CompetencyLevel.A2;
    }
    else if (step === 2) {
        if (percentage < 25)
            return this.step1.percentage >= 50 ? types_1.CompetencyLevel.A2 : types_1.CompetencyLevel.A1;
        if (percentage < 50)
            return types_1.CompetencyLevel.B1;
        return types_1.CompetencyLevel.B2;
    }
    else if (step === 3) {
        if (percentage < 25)
            return types_1.CompetencyLevel.B2;
        if (percentage < 50)
            return types_1.CompetencyLevel.C1;
        return types_1.CompetencyLevel.C2;
    }
    return null;
};
const Assessment = mongoose_1.default.model('Assessment', assessmentSchema);
exports.default = Assessment;
//# sourceMappingURL=Assessment.model.js.map