import { Router } from 'express';
import { body, param } from 'express-validator';
import * as adminController from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { UserRole } from '../types';

const router = Router();

router.use(authenticate);
router.use(authorize(UserRole.ADMIN));

router.get('/dashboard', adminController.getDashboardStats);

router.get('/users', adminController.getAllUsers);

router.get(
  '/users/:id',
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    validateRequest
  ],
  adminController.getUserById
);

router.patch(
  '/users/:id/status',
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('isActive').isBoolean().withMessage('isActive must be a boolean'),
    validateRequest
  ],
  adminController.updateUserStatus
);

router.patch(
  '/users/:id/role',
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('role').isIn(Object.values(UserRole)).withMessage('Invalid role'),
    validateRequest
  ],
  adminController.updateUserRole
);

// Create a new user
router.post(
  '/users',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(Object.values(UserRole)).withMessage('Invalid role'),
    validateRequest
  ],
  adminController.createUser
);

// Update user details
router.put(
  '/users/:id',
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('role').optional().isIn(Object.values(UserRole)).withMessage('Invalid role'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
    validateRequest
  ],
  adminController.updateUser
);

// Reset user password
router.patch(
  '/users/:id/password',
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validateRequest
  ],
  adminController.resetUserPassword
);

router.delete(
  '/users/:id',
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    validateRequest
  ],
  adminController.deleteUser
);

// Delete user assessment
router.delete(
  '/users/:userId/assessment',
  [
    param('userId').isMongoId().withMessage('Invalid user ID'),
    validateRequest
  ],
  adminController.deleteUserAssessment
);

router.get('/reports/assessments', adminController.getAssessmentReports);

export default router;