import { Router } from 'express';
import { body, param } from 'express-validator';
import * as questionController from '../controllers/question.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { UserRole, CompetencyLevel, QuestionDifficulty } from '../types';

const router = Router();

router.use(authenticate);

router.get('/', questionController.getAllQuestions);

router.get('/stats', questionController.getQuestionStats);

router.get(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid question ID'),
    validateRequest
  ],
  questionController.getQuestionById
);

router.use(authorize(UserRole.ADMIN));

router.post(
  '/',
  [
    body('competency').trim().notEmpty().withMessage('Competency is required'),
    body('level').isIn(Object.values(CompetencyLevel)).withMessage('Invalid level'),
    body('questionText').trim().notEmpty().withMessage('Question text is required'),
    body('options.a').trim().notEmpty().withMessage('Option A is required'),
    body('options.b').trim().notEmpty().withMessage('Option B is required'),
    body('options.c').trim().notEmpty().withMessage('Option C is required'),
    body('options.d').trim().notEmpty().withMessage('Option D is required'),
    body('correctAnswer').isIn(['a', 'b', 'c', 'd']).withMessage('Invalid correct answer'),
    body('difficulty').optional().isIn(Object.values(QuestionDifficulty)).withMessage('Invalid difficulty'),
    body('timeLimit').optional().isInt({ min: 30, max: 300 }).withMessage('Time limit must be between 30 and 300 seconds'),
    validateRequest
  ],
  questionController.createQuestion
);

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid question ID'),
    body('competency').optional().trim().notEmpty().withMessage('Competency cannot be empty'),
    body('level').optional().isIn(Object.values(CompetencyLevel)).withMessage('Invalid level'),
    body('questionText').optional().trim().notEmpty().withMessage('Question text cannot be empty'),
    body('correctAnswer').optional().isIn(['a', 'b', 'c', 'd']).withMessage('Invalid correct answer'),
    body('difficulty').optional().isIn(Object.values(QuestionDifficulty)).withMessage('Invalid difficulty'),
    body('timeLimit').optional().isInt({ min: 30, max: 300 }).withMessage('Time limit must be between 30 and 300 seconds'),
    validateRequest
  ],
  questionController.updateQuestion
);

router.delete(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid question ID'),
    validateRequest
  ],
  questionController.deleteQuestion
);

router.post(
  '/bulk',
  [
    body('questions').isArray({ min: 1 }).withMessage('Questions array is required'),
    body('questions.*.competency').trim().notEmpty().withMessage('Competency is required'),
    body('questions.*.level').isIn(Object.values(CompetencyLevel)).withMessage('Invalid level'),
    body('questions.*.questionText').trim().notEmpty().withMessage('Question text is required'),
    body('questions.*.options.a').trim().notEmpty().withMessage('Option A is required'),
    body('questions.*.options.b').trim().notEmpty().withMessage('Option B is required'),
    body('questions.*.options.c').trim().notEmpty().withMessage('Option C is required'),
    body('questions.*.options.d').trim().notEmpty().withMessage('Option D is required'),
    body('questions.*.correctAnswer').isIn(['a', 'b', 'c', 'd']).withMessage('Invalid correct answer'),
    validateRequest
  ],
  questionController.bulkCreateQuestions
);

export default router;