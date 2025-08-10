import mongoose, { Schema } from 'mongoose';
import { ICertificate, CompetencyLevel } from '../types';
import { v4 as uuidv4 } from 'uuid';

const certificateSchema = new Schema<ICertificate>(
  {
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    assessmentId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Assessment',
      required: [true, 'Assessment ID is required']
    },
    certificateNumber: {
      type: String,
      unique: true,
      required: true
    },
    level: {
      type: String,
      enum: Object.values(CompetencyLevel),
      required: [true, 'Certification level is required']
    },
    issuedDate: {
      type: Date,
      default: Date.now
    },
    validUntil: {
      type: Date,
      default: function() {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 2); // Valid for 2 years
        return date;
      }
    },
    pdfUrl: String,
    verificationCode: {
      type: String,
      unique: true,
      required: true
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

certificateSchema.index({ userId: 1 });
certificateSchema.index({ certificateNumber: 1 });
certificateSchema.index({ verificationCode: 1 });

certificateSchema.pre('save', function(next) {
  const doc = this as any;
  if (!doc.certificateNumber) {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    doc.certificateNumber = `TSC-${year}-${random}`;
  }
  
  if (!doc.verificationCode) {
    doc.verificationCode = uuidv4().replace(/-/g, '').substring(0, 12).toUpperCase();
  }
  
  next();
});

const Certificate = mongoose.model<ICertificate>('Certificate', certificateSchema);

export default Certificate;