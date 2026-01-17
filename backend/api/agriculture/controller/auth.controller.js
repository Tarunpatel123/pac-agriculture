const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const signup = async (req, res) => {
    try {
        const { fullName, email, mobileNumber, password, location } = req.body;

        // Validation
        if (!fullName || !email || !mobileNumber || !password || !location) {
            return res.status(400).json({ message: "All fields are required including location" });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        
        const hashedPassword = await bcrypt.hash(password, 10);

        if (user) {
            // If user exists but is only an enrollment (no password yet)
            if (user.userType === 'enrollment' || !user.password) {
                user.password = hashedPassword;
                user.userType = 'registered';
                // Update location if provided
                if (location) user.location = location;
                await user.save();
                return res.status(201).json({ message: "Account created successfully from existing enrollment" });
            } else {
                return res.status(400).json({ message: "User already exists with this email" });
            }
        }

        // Create new user if not exists
        user = new User({
            fullName,
            email,
            mobileNumber,
            password: hashedPassword,
            location,
            userType: 'registered'
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'pac_secret_key_2026',
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Login failed" });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = Date.now() + 600000; // 10 minutes expiry
        await user.save();

        // Send Email
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Password Reset OTP - PAC Barwaha",
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
                    <h2 style="color: #2e7d32; text-align: center;">PAC Barwaha</h2>
                    <p>Hello <strong>${user.fullName}</strong>,</p>
                    <p>You requested to reset your password. Use the OTP below to proceed:</p>
                    <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; border-radius: 5px; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p style="color: #666; font-size: 12px;">This OTP is valid for 10 minutes only. If you didn't request this, please ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="text-align: center; font-size: 12px; color: #999;">&copy; 2026 PAC Barwaha. All rights reserved.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ message: "Failed to send OTP" });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

        const user = await User.findOne({ 
            email, 
            resetPasswordOTP: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        console.error("Verify OTP Error:", error);
        res.status(500).json({ message: "Verification failed" });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ 
            email, 
            resetPasswordOTP: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired OTP session" });
        }

        // Hash new password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordOTP = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully. You can now login." });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "Failed to reset password" });
    }
};

module.exports = { signup, login, forgotPassword, verifyOTP, resetPassword };
