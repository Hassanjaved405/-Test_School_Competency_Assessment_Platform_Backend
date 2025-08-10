import mongoose, { Schema } from 'mongoose';
import { IQuestion, CompetencyLevel, QuestionDifficulty } from '../types';

const questionSchema = new Schema<IQuestion>(
  {
    competency: {
      type: String,
      required: [true, 'Competency is required'],
      trim: true
    },
    level: {
      type: String,
      enum: Object.values(CompetencyLevel),
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
      enum: Object.values(QuestionDifficulty),
      default: QuestionDifficulty.MEDIUM
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
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(_doc: any, ret: any) {
        delete ret.__v;
        return ret;
      }
    }
  }
);

questionSchema.index({ competency: 1, level: 1 });
questionSchema.index({ level: 1 });
questionSchema.index({ isActive: 1 });

const Question = mongoose.model<IQuestion>('Question', questionSchema);

export default Question;