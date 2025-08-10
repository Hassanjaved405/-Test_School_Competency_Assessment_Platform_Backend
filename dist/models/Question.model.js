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
const questionSchema = new mongoose_1.Schema({
    competency: {
        type: String,
        required: [true, 'Competency is required'],
        trim: true
    },
    level: {
        type: String,
        enum: Object.values(types_1.CompetencyLevel),
        required: [true, 'Level is required']
    },
    questionText: {
        type: String,
        required: [true, 'Question text is required'],
        trim: true
    },
    options: {
        a: {
            type: String,
            required: [true, 'Option A is required'],
            trim: true
        },
        b: {
            type: String,
            required: [true, 'Option B is required'],
            trim: true
        },
        c: {
            type: String,
            required: [true, 'Option C is required'],
            trim: true
        },
        d: {
            type: String,
            required: [true, 'Option D is required'],
            trim: true
        }
    },
    correctAnswer: {
        type: String,
        enum: ['a', 'b', 'c', 'd'],
        required: [true, 'Correct answer is required']
    },
    difficulty: {
        type: String,
        enum: Object.values(types_1.QuestionDifficulty),
        default: types_1.QuestionDifficulty.MEDIUM
    },
    explanation: {
        type: String,
        trim: true
    },
    timeLimit: {
        type: Number,
        default: 60, // 1 minute in seconds
        min: [30, 'Time limit must be at least 30 seconds'],
        max: [300, 'Time limit cannot exceed 5 minutes']
    },
    isActive: {
        type: Boolean,
        default: true
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
questionSchema.index({ competency: 1, level: 1 });
questionSchema.index({ level: 1 });
questionSchema.index({ isActive: 1 });
const Question = mongoose_1.default.model('Question', questionSchema);
exports.default = Question;
//# sourceMappingURL=Question.model.js.map