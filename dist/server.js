"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const database_1 = __importDefault(require("./config/database"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const assessment_routes_1 = __importDefault(require("./routes/assessment.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const question_routes_1 = __importDefault(require("./routes/question.routes"));
const certificate_routes_1 = __importDefault(require("./routes/certificate.routes"));
const supervisor_routes_1 = __importDefault(require("./routes/supervisor.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const seed_utils_1 = require("./utils/seed.utils");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many authentication attempts, please try again later.'
});
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: [
        process.env.CLIENT_URL || 'http://localhost:3000',
        'http://localhost:3001'
    ],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use('/api', limiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/assessment', assessment_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.use('/api/questions', question_routes_1.default);
app.use('/api/certificates', certificate_routes_1.default);
app.use('/api/supervisor', supervisor_routes_1.default);
app.use(error_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
// Initialize database connection
(0, database_1.default)().catch((error) => {
    console.error('Database connection failed:', error);
});
// Only start the server if not in Vercel environment
if (process.env.VERCEL !== '1' && require.main === module) {
    const startServer = async () => {
        try {
            await (0, database_1.default)();
            if (process.env.NODE_ENV === 'development') {
                await (0, seed_utils_1.seedDatabase)();
            }
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
                console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
            });
        }
        catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    };
    startServer();
}
exports.default = app;
//# sourceMappingURL=server.js.map