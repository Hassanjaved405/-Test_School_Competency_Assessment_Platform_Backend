"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let isConnected = false;
const connectDatabase = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_school_assessment';
        if (!mongoUri || mongoUri.includes('<db_password>')) {
            throw new Error('Invalid MongoDB URI. Please set MONGODB_URI environment variable with actual password.');
        }
        await mongoose_1.default.connect(mongoUri, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = true;
        console.log(`MongoDB connected successfully`);
        mongoose_1.default.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
            isConnected = false;
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false;
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        // Don't exit in serverless environment
        if (process.env.VERCEL !== '1') {
            process.exit(1);
        }
        throw error;
    }
};
exports.default = connectDatabase;
//# sourceMappingURL=database.js.map