import { Response, NextFunction, Request } from 'express';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import Certificate from '../models/Certificate.model';
import User from '../models/User.model';
import Assessment from '../models/Assessment.model';
import { AuthRequest } from '../types';
import { AppError } from '../middleware/error.middleware';

export const getMyCertificates = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    const certificates = await Certificate.find({ userId })
      .sort({ createdAt: -1 })
      .populate('assessmentId', 'completedAt totalTimeSpent');
    
    res.status(200).json({
      success: true,
      data: { certificates }
    });
  } catch (error) {
    next(error);
  }
};

export const getCertificateById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    
    const certificate = await Certificate.findById(id)
      .populate('userId', 'firstName lastName email')
      .populate('assessmentId');
    
    if (!certificate) {
      throw new AppError('Certificate not found', 404);
    }
    
    if ((certificate.userId as any)._id.toString() !== userId && req.user?.role !== 'admin') {
      throw new AppError('You do not have permission to view this certificate', 403);
    }
    
    res.status(200).json({
      success: true,
      data: { certificate }
    });
  } catch (error) {
    next(error);
  }
};

export const verifyCertificate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { certificateNumber, verificationCode } = req.body;
    
    const certificate = await Certificate.findOne({
      certificateNumber,
      verificationCode
    }).populate('userId', 'firstName lastName email');
    
    if (!certificate) {
      throw new AppError('Invalid certificate number or verification code', 404);
    }
    
    const isValid = certificate.validUntil ? new Date() <= certificate.validUntil : true;
    
    res.status(200).json({
      success: true,
      data: {
        isValid,
        certificate: {
          certificateNumber: certificate.certificateNumber,
          level: certificate.level,
          issuedDate: certificate.issuedDate,
          validUntil: certificate.validUntil,
          holderName: `${(certificate.userId as any).firstName} ${(certificate.userId as any).lastName}`,
          holderEmail: (certificate.userId as any).email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const generateCertificatePDF = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    
    const certificate = await Certificate.findById(id).populate('userId', 'firstName lastName email');
    
    if (!certificate) {
      throw new AppError('Certificate not found', 404);
    }
    
    if ((certificate.userId as any)._id.toString() !== userId && req.user?.role !== 'admin') {
      throw new AppError('You do not have permission to download this certificate', 403);
    }
    
    const user = certificate.userId as any;
    
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margin: 50
    });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate-${certificate.certificateNumber}.pdf`);
    
    doc.pipe(res);
    
    doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
       .lineWidth(3)
       .stroke('#4CAF50');
    
    doc.rect(40, 40, doc.page.width - 80, doc.page.height - 80)
       .lineWidth(1)
       .stroke('#4CAF50');
    
    doc.fontSize(36)
       .font('Helvetica-Bold')
       .fillColor('#333')
       .text('CERTIFICATE OF ACHIEVEMENT', 0, 100, {
         align: 'center'
       });
    
    doc.fontSize(20)
       .font('Helvetica')
       .fillColor('#666')
       .text('This is to certify that', 0, 180, {
         align: 'center'
       });
    
    doc.fontSize(32)
       .font('Helvetica-Bold')
       .fillColor('#4CAF50')
       .text(`${user.firstName} ${user.lastName}`, 0, 220, {
         align: 'center'
       });
    
    doc.fontSize(18)
       .font('Helvetica')
       .fillColor('#666')
       .text('has successfully completed the Test School Digital Competency Assessment', 0, 280, {
         align: 'center'
       });
    
    doc.fontSize(16)
       .text('and achieved the level of', 0, 310, {
         align: 'center'
       });
    
    doc.fontSize(36)
       .font('Helvetica-Bold')
       .fillColor('#4CAF50')
       .text(certificate.level, 0, 350, {
         align: 'center'
       });
    
    doc.fontSize(14)
       .font('Helvetica')
       .fillColor('#666')
       .text(`Certificate Number: ${certificate.certificateNumber}`, 100, 420);
    
    doc.text(`Issue Date: ${new Date(certificate.issuedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`, 100, 440);
    
    if (certificate.validUntil) {
      doc.text(`Valid Until: ${new Date(certificate.validUntil).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}`, 100, 460);
    }
    
    doc.text(`Verification Code: ${certificate.verificationCode}`, 100, 480);
    
    doc.fontSize(10)
       .fillColor('#999')
       .text('This certificate can be verified at www.testschool.com/verify', 0, 520, {
         align: 'center'
       });
    
    doc.end();
  } catch (error) {
    next(error);
  }
};

export const regenerateCertificate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { assessmentId } = req.body;
    const userId = req.user?.id;
    
    const assessment = await Assessment.findOne({
      _id: assessmentId,
      userId,
      isCompleted: true,
      finalLevel: { $ne: null }
    });
    
    if (!assessment) {
      throw new AppError('No completed assessment found', 404);
    }
    
    let certificate = await Certificate.findOne({ assessmentId, userId });
    
    if (!certificate) {
      certificate = await Certificate.create({
        userId,
        assessmentId,
        level: assessment.finalLevel!
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Certificate regenerated successfully',
      data: { certificate }
    });
  } catch (error) {
    next(error);
  }
};