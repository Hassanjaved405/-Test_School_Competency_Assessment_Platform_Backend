import mongoose, { Schema } from 'mongoose';
import { IAssessment, AssessmentStep, CompetencyLevel } from '../types';

const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
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

const stepSchema = new Schema({
  questions: [{
    type: Schema.Types.ObjectId,
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

const assessmentSchema = new Schema<IAssessment>(
  {
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    currentStep: {
      type: Number,
      enum: [1, 2, 3],
      default: AssessmentStep.STEP_1
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
      enum: [...Object.values(CompetencyLevel), null],
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

assessmentSchema.index({ userId: 1 });
assessmentSchema.index({ isCompleted: 1 });
assessmentSchema.index({ finalLevel: 1 });

assessmentSchema.methods.calculateStepResult = function(step: number): CompetencyLevel | null {
  const stepData = this[`step${step}`];
  const percentage = stepData.percentage;

  if (step === 1) {
    if (percentage < 25) return null;
    if (percentage < 50) return CompetencyLevel.A1;
    return CompetencyLevel.A2;
  } else if (step === 2) {
    if (percentage < 25) return this.step1.percentage >= 50 ? CompetencyLevel.A2 : CompetencyLevel.A1;
    if (percentage < 50) return CompetencyLevel.B1;
    return CompetencyLevel.B2;
  } else if (step === 3) {
    if (percentage < 25) return CompetencyLevel.B2;
    if (percentage < 50) return CompetencyLevel.C1;
    return CompetencyLevel.C2;
  }
  
  return null;
};

const Assessment = mongoose.model<IAssessment>('Assessment', assessmentSchema);

export default Assessment;