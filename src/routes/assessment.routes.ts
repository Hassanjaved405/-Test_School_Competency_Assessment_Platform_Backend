import { Router } from 'express';
import { body, param } from 'express-validator';
import * as assessmentController from '../controllers/assessment.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';

const router = Router();

router.use(authenticate);

router.post('/start', assessmentController.startAssessment);

router.get('/status', assessmentController.getAssessmentStatus);

router.get('/history', assessmentController.getAssessmentHistory);

router.get(
  '/step/:step/questions',
  [
    param('step').isInt({ min: 1, max: 3 }).withMessage('Step must be 1, 2, or 3'),
    validateRequest
  ],
  assessmentController.getStepQuestions
);

router.post(
  '/step/:step/submit',
  [
    param('step').isInt({ min: 1, max: 3 }).withMessage('Step must be 1, 2, or 3'),
    body('answers').isArray().withMessage('Answers must be an array'),
    body('answers.*.questionId').notEmpty().withMessage('Question ID is required'),
    body('answers.*.answer').optional().isIn(['a', 'b', 'c', 'd', '']).withMessage('Invalid answer option'),
    body('answers.*.timeSpent').optional().isInt({ min: 0 }).withMessage('Time spent must be a positive integer'),
    validateRequest
  ],
  assessmentController.submitStepAnswers
);

export default router;