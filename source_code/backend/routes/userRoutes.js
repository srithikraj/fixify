const express = require("express")
const database = require("../connect")
const ObjectId = require("mongodb").ObjectId
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const { sendOTP, verifyOTP } = require("../controller/otpService");



let userRoutes = express.Router()

//////////////////////////////////////////////////////////////////////////
// Read Routes
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Create Routes
//////////////////////////////////////////////////////////////////////////

/**
 * Request Type: POST 
 * URL: http://localhost:3000/users/login
 * Description: Verify user login info. Returns user info upon success.
*/

userRoutes.route("/users").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("users").find({}).toArray()
    response.json({ data })
})

userRoutes.route("/users/login").post(async (request, response) => {
    try {
        let db = database.getDb();
        const user = await db.collection("users").findOne({ username: request.body.username });

        if (!user) {
            return response.status(404).json({ success: false, message: "Login Failed! User not found!" });
        }

        const confirmation = await bcrypt.compare(request.body.password, user.password);
        if (!confirmation) {
            return response.status(401).json({ success: false, message: "Login Failed! Incorrect Password!" });
        }

        if (!user.isVerified) {
            console.log(`User ${user._id} not verified, sending OTP to ${user.email}`);
            await sendOTP(user.email, user._id);
            return response.status(403).json({
                success: false,
                message: "Your email is not verified. A new OTP has been sent to your email.",
                userId: user._id,
            });
        }

        const token = jwt.sign(
            { username: user.username, role: user.role, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        response.json({
            success: true,
            message: "Login Successful!",
            token: token,
            user: { id: user._id, username: user.username, first_name: user.first_name, last_name: user.last_name, role: user.role, email: user.email, phone: user.phone, address: user.address },
        });
    } catch (error) {
        console.error("Error during login:", error);
        response.status(500).json({ success: false, message: "An error occurred during login." });
    }
});


// userRoutes.post("/signup", async (req, res) => {
//     try {
//         const { username, password, first_name, last_name, email, phone, role, address } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//         if (existingUser) {
//             return res.status(400).json({ message: "Username or email already exists." });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const newUser = new User({
//             username,
//             password: hashedPassword,
//             first_name,
//             last_name,
//             email,
//             phone,
//             role,
//             address,
//         });

//         // Save user to database
//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully!", userId: newUser._id });
//     } catch (error) {
//         console.error("Signup Error:", error);
//         res.status(500).json({ message: "Server error. Please try again later." });
//     }
// });

userRoutes.post("/signup", async (req, res) => {
    try {
        const { username, password, first_name, last_name, email, phone, role, address } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
            first_name,
            last_name,
            email,
            phone,
            role,
            address,
            isVerified: false,
        });

        // Save user to database
        await newUser.save();

        // Send OTP to the user's email
        await sendOTP(email, newUser._id);

        res.status(201).json({
            message: "User registered successfully! Please verify your email with OTP.",
            userId: newUser._id,
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

userRoutes.post("/send-otp", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await sendOTP(email, user._id);
        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error("Send OTP error:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
});

userRoutes.post("/verify-otp", async (req, res) => {
    try {
        const { userId, otp } = req.body;
        if (!userId || !otp) {
            return res.status(400).json({ success: false, message: "User ID and OTP required" });
        }

        const result = await verifyOTP(userId, otp);
        if (result.success) {
            await User.findByIdAndUpdate(userId, { isVerified: true });
        }
        res.json(result);
    } catch (error) {
        console.error("Verify OTP error:", error);
        res.status(500).json({ success: false, message: "Failed to verify OTP" });
    }
});

//////////////////////////////////////////////////////////////////////////
// Update Routes
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Delete Routes
//////////////////////////////////////////////////////////////////////////


//========================================================================
module.exports = userRoutes