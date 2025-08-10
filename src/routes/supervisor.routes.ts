import { Router } from 'express';
import { 
  getMyStudents, 
  getStudentProgress, 
  generateProgressReport,
  getPerformanceAnalytics
} from '../controllers/supervisor.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../types';

const router = Router();

// All routes require authentication and supervisor role
router.use(authenticate);
router.use(authorize(UserRole.SUPERVISOR, UserRole.ADMIN));

// Get all students under supervision
router.get('/students', getMyStudents);

// Get detailed progress of a specific student
router.get('/students/:studentId/progress', getStudentProgress);

// Generate progress report
router.get('/reports/progress', generateProgressReport);

// Get performance analytics
router.get('/analytics/performance', getPerformanceAnalytics);

export default router;