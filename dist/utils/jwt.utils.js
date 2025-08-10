"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenPair = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (payload) => {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error('JWT_ACCESS_SECRET is required in environment variables');
    }
    const expiresIn = process.env.JWT_ACCESS_EXPIRE || '15m';
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiresIn });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
        throw new Error('JWT_REFRESH_SECRET is required in environment variables');
    }
    const expiresIn = process.env.JWT_REFRESH_EXPIRE || '7d';
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiresIn });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyAccessToken = (token) => {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw new Error('JWT_ACCESS_SECRET is required in environment variables');
    }
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
        throw new Error('JWT_REFRESH_SECRET is required in environment variables');
    }
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyRefreshToken = verifyRefreshToken;
const generateTokenPair = (payload) => {
    return {
        accessToken: (0, exports.generateAccessToken)(payload),
        refreshToken: (0, exports.generateRefreshToken)(payload)
    };
};
exports.generateTokenPair = generateTokenPair;
//# sourceMappingURL=jwt.utils.js.map