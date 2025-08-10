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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const adminController = __importStar(require("../controllers/admin.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const types_1 = require("../types");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.use((0, auth_middleware_1.authorize)(types_1.UserRole.ADMIN));
router.get('/dashboard', adminController.getDashboardStats);
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid user ID'),
    validation_middleware_1.validateRequest
], adminController.getUserById);
router.patch('/users/:id/status', [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid user ID'),
    (0, express_validator_1.body)('isActive').isBoolean().withMessage('isActive must be a boolean'),
    validation_middleware_1.validateRequest
], adminController.updateUserStatus);
router.patch('/users/:id/role', [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid user ID'),
    (0, express_validator_1.body)('role').isIn(Object.values(types_1.UserRole)).withMessage('Invalid role'),
    validation_middleware_1.validateRequest
], adminController.updateUserRole);
// Create a new user
router.post('/users', [
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('Last name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('role').optional().isIn(Object.values(types_1.UserRole)).withMessage('Invalid role'),
    validation_middleware_1.validateRequest
], adminController.createUser);
// Update user details
router.put('/users/:id', [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid user ID'),
    (0, express_validator_1.body)('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    (0, express_validator_1.body)('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('role').optional().isIn(Object.values(types_1.UserRole)).withMessage('Invalid role'),
    (0, express_validator_1.body)('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
    validation_middleware_1.validateRequest
], adminController.updateUser);
// Reset user password
router.patch('/users/:id/password', [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid user ID'),
    (0, express_validator_1.body)('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validation_middleware_1.validateRequest
], adminController.resetUserPassword);
router.delete('/users/:id', [
    (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid user ID'),
    validation_middleware_1.validateRequest
], adminController.deleteUser);
// Delete user assessment
router.delete('/users/:userId/assessment', [
    (0, express_validator_1.param)('userId').isMongoId().withMessage('Invalid user ID'),
    validation_middleware_1.validateRequest
], adminController.deleteUserAssessment);
router.get('/reports/assessments', adminController.getAssessmentReports);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map