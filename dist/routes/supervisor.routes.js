"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supervisor_controller_1 = require("../controllers/supervisor.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const types_1 = require("../types");
const router = (0, express_1.Router)();
// All routes require authentication and supervisor role
router.use(auth_middleware_1.authenticate);
router.use((0, auth_middleware_1.authorize)(types_1.UserRole.SUPERVISOR, types_1.UserRole.ADMIN));
// Get all students under supervision
router.get('/students', supervisor_controller_1.getMyStudents);
// Get detailed progress of a specific student
router.get('/students/:studentId/progress', supervisor_controller_1.getStudentProgress);
// Generate progress report
router.get('/reports/progress', supervisor_controller_1.generateProgressReport);
// Get performance analytics
router.get('/analytics/performance', supervisor_controller_1.getPerformanceAnalytics);
exports.default = router;
//# sourceMappingURL=supervisor.routes.js.map