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
const uuid_1 = require("uuid");
const certificateSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    assessmentId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        enum: Object.values(types_1.CompetencyLevel),
        required: [true, 'Certification level is required']
    },
    issuedDate: {
        type: Date,
        default: Date.now
    },
    validUntil: {
        type: Date,
        default: function () {
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
}, {
    timestamps: true,
    toJSON: {
        transform: function (_doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});
certificateSchema.index({ userId: 1 });
certificateSchema.index({ certificateNumber: 1 });
certificateSchema.index({ verificationCode: 1 });
certificateSchema.pre('save', function (next) {
    const doc = this;
    if (!doc.certificateNumber) {
        const year = new Date().getFullYear();
        const random = Math.floor(10000 + Math.random() * 90000);
        doc.certificateNumber = `TSC-${year}-${random}`;
    }
    if (!doc.verificationCode) {
        doc.verificationCode = (0, uuid_1.v4)().replace(/-/g, '').substring(0, 12).toUpperCase();
    }
    next();
});
const Certificate = mongoose_1.default.model('Certificate', certificateSchema);
exports.default = Certificate;
//# sourceMappingURL=Certificate.model.js.map