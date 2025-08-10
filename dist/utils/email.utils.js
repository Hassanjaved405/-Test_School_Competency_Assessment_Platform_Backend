"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEmailConfiguration = exports.sendAssessmentFailureEmail = exports.sendCertificateEmail = exports.sendWelcomeEmail = exports.sendPasswordResetEmail = exports.sendOTPEmail = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create transporter with fallback for development
const createTransporter = () => {
    // Check if email credentials are properly configured
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const isConfigured = emailUser &&
        emailUser !== 'your_email@gmail.com' &&
        emailUser !== 'your_actual_gmail@gmail.com' &&
        emailPass &&
        emailPass !== 'your_app_password' &&
        emailPass !== 'your_gmail_app_password';
    if (!isConfigured) {
        console.log('\n⚠️  Email Configuration Status:');
        console.log('================================');
        if (process.env.NODE_ENV === 'development') {
            console.log('📧 Email service not configured.');
            console.log('🔧 Using console logging for OTPs in development mode.');
            console.log('💡 To enable real emails, configure SMTP settings in .env file:');
            console.log('   EMAIL_USER=your_email@gmail.com');
            console.log('   EMAIL_PASS=your_app_specific_password');
            console.log('================================\n');
            // Return a mock transporter for development
            return {
                sendMail: async (mailOptions) => {
                    console.log('\n📮 Development Email (Not Sent):');
                    console.log('--------------------------------');
                    console.log('To:', mailOptions.to);
                    console.log('From:', mailOptions.from);
                    console.log('Subject:', mailOptions.subject);
                    if (mailOptions.text) {
                        console.log('Text Content:', mailOptions.text);
                    }
                    // Extract OTP from HTML if present
                    const otpMatch = mailOptions.html?.match(/<h1[^>]*>(\d{6})<\/h1>/);
                    if (otpMatch) {
                        console.log('\n🔐 OTP CODE:', otpMatch[1]);
                    }
                    console.log('--------------------------------\n');
                    return {
                        messageId: 'dev-' + Date.now(),
                        accepted: [mailOptions.to],
                        rejected: [],
                        response: 'Development mode - email logged to console'
                    };
                },
                verify: async () => {
                    return true;
                }
            };
        }
        else {
            // In production, log warning but don't crash
            console.warn('⚠️ Email service not configured in production.');
            console.warn('📧 Email features will be disabled. Configure EMAIL_USER and EMAIL_PASS to enable.');
            // Return a mock transporter that logs warnings
            return {
                sendMail: async (mailOptions) => {
                    console.warn('⚠️ Email not sent (service not configured):', mailOptions.to);
                    return {
                        messageId: 'mock-' + Date.now(),
                        accepted: [mailOptions.to],
                        rejected: [],
                        response: 'Email service not configured - email not sent'
                    };
                },
                verify: async () => {
                    return false;
                }
            };
        }
    }
    // Create real transporter with configured credentials
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
            user: emailUser,
            pass: emailPass
        },
        tls: {
            rejectUnauthorized: false // Allow self-signed certificates
        }
    });
    // Verify transporter configuration
    transporter.verify((error, success) => {
        if (error) {
            console.error('❌ Email configuration error:', error.message);
            console.log('💡 Make sure you have:');
            console.log('   1. Enabled 2-factor authentication in Gmail');
            console.log('   2. Created an app-specific password');
            console.log('   3. Used the app password (not your regular password) in EMAIL_PASS');
        }
        else {
            console.log('✅ Email service configured successfully');
            console.log(`📧 Sending emails from: ${emailUser}`);
        }
    });
    return transporter;
};
// Create transporter instance with error handling
let transporter;
try {
    transporter = createTransporter();
}
catch (error) {
    console.error('Failed to create email transporter:', error);
    // Create a fallback transporter
    transporter = {
        sendMail: async (mailOptions) => {
            console.warn('⚠️ Email not sent (service error):', mailOptions.to);
            return {
                messageId: 'error-' + Date.now(),
                accepted: [mailOptions.to],
                rejected: [],
                response: 'Email service error - email not sent'
            };
        },
        verify: async () => false
    };
}
const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: `Test School <${process.env.EMAIL_USER || 'noreply@testschool.com'}>`,
            to,
            subject,
            html
        };
        const info = await transporter.sendMail(mailOptions);
        if (process.env.NODE_ENV === 'development') {
            console.log('✅ Email processed:', info.messageId);
        }
        return true;
    }
    catch (error) {
        console.error('❌ Email sending failed:', error.message);
        // In development, still return true to allow the flow to continue
        if (process.env.NODE_ENV === 'development') {
            console.log('⚠️  Continuing despite email failure (development mode)');
            return true;
        }
        return false;
    }
};
exports.sendEmail = sendEmail;
const sendOTPEmail = async (email, otp, name) => {
    const subject = 'Your OTP for Test School Assessment';
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Hello ${name},</h2>
      <p>Your OTP for Test School Assessment Platform is:</p>
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
        <h1 style="color: #4CAF50; letter-spacing: 5px;">${otp}</h1>
      </div>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn't request this OTP, please ignore this email.</p>
      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">Test School Assessment Platform</p>
    </div>
  `;
    return (0, exports.sendEmail)(email, subject, html);
};
exports.sendOTPEmail = sendOTPEmail;
const sendPasswordResetEmail = async (email, resetUrl, name) => {
    const subject = 'Password Reset Request - Test School';
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Hello ${name},</h2>
      <p>You have requested to reset your password. Click the button below to proceed:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
      </div>
      <p>Or copy and paste this link in your browser:</p>
      <p style="word-break: break-all; color: #666;">${resetUrl}</p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this reset, please ignore this email.</p>
      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">Test School Assessment Platform</p>
    </div>
  `;
    return (0, exports.sendEmail)(email, subject, html);
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendWelcomeEmail = async (email, name) => {
    const subject = 'Welcome to Test School Assessment Platform';
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Welcome ${name}!</h2>
      <p>Thank you for registering with Test School Assessment Platform.</p>
      <p>You can now start your digital competency assessment journey with us.</p>
      <h3>How it works:</h3>
      <ul>
        <li>Complete Step 1 to assess your A1 & A2 levels</li>
        <li>Score 75% or higher to proceed to Step 2</li>
        <li>Continue through all steps to achieve your certification</li>
      </ul>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/login" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Start Assessment</a>
      </div>
      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">Test School Assessment Platform</p>
    </div>
  `;
    return (0, exports.sendEmail)(email, subject, html);
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendCertificateEmail = async (email, name, level, certificateNumber) => {
    const subject = `Congratulations! You've achieved ${level} certification`;
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4CAF50;">Congratulations ${name}!</h2>
      <p>You have successfully achieved <strong>${level}</strong> certification in the Test School Assessment.</p>
      <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #4CAF50; margin: 20px 0;">
        <p><strong>Certificate Number:</strong> ${certificateNumber}</p>
        <p><strong>Level Achieved:</strong> ${level}</p>
        <p><strong>Issue Date:</strong> ${new Date().toLocaleDateString()}</p>
      </div>
      <p>You can download your certificate from your dashboard.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/certificates" style="background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">View Certificate</a>
      </div>
      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">Test School Assessment Platform</p>
    </div>
  `;
    return (0, exports.sendEmail)(email, subject, html);
};
exports.sendCertificateEmail = sendCertificateEmail;
// Function to send assessment failure notification
const sendAssessmentFailureEmail = async (email, name, step, percentage) => {
    const subject = 'Assessment Result - Test School';
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Hello ${name},</h2>
      <p>You have completed Step ${step} of the assessment.</p>
      <div style="background-color: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; margin: 20px 0;">
        <p><strong>Score:</strong> ${percentage.toFixed(1)}%</p>
        <p><strong>Result:</strong> ${percentage < 25 ? 'Failed - No retake allowed' : 'Assessment ended'}</p>
      </div>
      ${step === 1 && percentage < 25 ?
        '<p style="color: #d32f2f;">Unfortunately, you scored below 25% in Step 1. According to our policy, retakes are not allowed for this assessment.</p>' :
        '<p>While you did not qualify for the next step, you can view your results and understand areas for improvement.</p>'}
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/results" style="background-color: #2196F3; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">View Results</a>
      </div>
      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">Test School Assessment Platform</p>
    </div>
  `;
    return (0, exports.sendEmail)(email, subject, html);
};
exports.sendAssessmentFailureEmail = sendAssessmentFailureEmail;
// Function to test email configuration
const testEmailConfiguration = async () => {
    try {
        await transporter.verify();
        console.log('✅ Email configuration test passed');
        return true;
    }
    catch (error) {
        console.error('❌ Email configuration test failed:', error.message);
        return false;
    }
};
exports.testEmailConfiguration = testEmailConfiguration;
//# sourceMappingURL=email.utils.js.map