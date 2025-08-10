"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const User_model_1 = __importDefault(require("../models/User.model"));
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({
                success: false,
                error: 'Access token is required'
            });
            return;
        }
        const decoded = (0, jwt_utils_1.verifyAccessToken)(token);
        const user = await User_model_1.default.findById(decoded.id).select('_id email role isActive');
        if (!user || !user.isActive) {
            res.status(401).json({
                success: false,
                error: 'Invalid or inactive user'
            });
            return;
        }
        req.user = {
            id: user._id.toString(),
            email: user.email,
            role: user.role
        };
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({
                success: false,
                error: 'Token has expired'
            });
        }
        else if (error.name === 'JsonWebTokenError') {
            res.status(401).json({
                success: false,
                error: 'Invalid token'
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Authentication failed'
            });
        }
    }
};
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                error: 'You do not have permission to access this resource'
            });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map