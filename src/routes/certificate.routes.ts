import { Router } from 'express';
import { body, param } from 'express-validator';
import * as certificateController from '../controllers/certificate.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';

const router = Router();

router.post(
  '/verify',
  [
    body('certificateNumber').trim().notEmpty().withMessage('Certificate number is required'),
    body('verificationCode').trim().notEmpty().withMessage('Verification code is required'),
    validateRequest
  ],
  certificateController.verifyCertificate
);

router.use(authenticate);

router.get('/my-certificates', certificateController.getMyCertificates);

router.get(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid certificate ID'),
    validateRequest
  ],
  certificateController.getCertificateById
);

router.get(
  '/:id/download',
  [
    param('id').isMongoId().withMessage('Invalid certificate ID'),
    validateRequest
  ],
  certificateController.generateCertificatePDF
);

router.post(
  '/regenerate',
  [
    body('assessmentId').isMongoId().withMessage('Valid assessment ID is required'),
    validateRequest
  ],
  certificateController.regenerateCertificate
);

export default router;