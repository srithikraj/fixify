const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const UserOTPVerification = require("../models/UserOTPVerification"); // Adjust path if needed

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "parekhbhargav25@gmail.com",
        pass: "rhonpqaxgusbujip",
    },
});

async function sendOTP(email, userId) {
    try {
        const otp = Math.floor(10000 + Math.random() * 90000).toString();
        const hashedOTP = await bcrypt.hash(otp, 10);
        const expiry = new Date(Date.now() + 10 * 60 * 1000);

        const otpRecord = new UserOTPVerification({
            user_id: userId,
            otp: hashedOTP,
            expiry,
        });
        await otpRecord.save();

        const mailOptions = {
            from: process.env.EMAIL_USER || "parekhbhargav25@gmail.com",
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
            html: `
                <h2>OTP Verification</h2>
                <p>Your OTP is: <strong>${otp}</strong></p>
                <p>Valid for 10 minutes.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error in sendOTP:", error);
        throw new Error("Failed to send OTP");
    }
}

async function verifyOTP(userId, inputOTP) {
    try {
        const otpRecord = await UserOTPVerification.findOne({ user_id: userId })
            .sort({ createdAt: -1 });

        if (!otpRecord) {
            return { success: false, message: "No OTP found" };
        }

        if (new Date() > otpRecord.expiry) {
            await UserOTPVerification.deleteOne({ _id: otpRecord._id });
            return { success: false, message: "OTP has expired" };
        }

        const isValid = await bcrypt.compare(inputOTP.toString(), otpRecord.otp);
        if (isValid) {
            await UserOTPVerification.deleteOne({ _id: otpRecord._id });
            return { success: true, message: "OTP verified successfully" };
        }
        return { success: false, message: "Invalid OTP" };
    } catch (error) {
        console.error("Error in verifyOTP:", error);
        throw new Error("Failed to verify OTP");
    }
}

module.exports = { sendOTP, verifyOTP };