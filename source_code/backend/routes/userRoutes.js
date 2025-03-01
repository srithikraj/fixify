const express = require("express")
const database = require("../connect")
const ObjectId = require("mongodb").ObjectId
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


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
userRoutes.route("/users/login").post( async (request, response) => {
    try {
        let db = database.getDb()
        const user = await db.collection("users").findOne({username: request.body.username})

        if (user) {
            let confirmation = await bcrypt.compare(request.body.password, user.password)
            if (confirmation) {
                const token = jwt.sign({username: user.username, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"})
                response.json({success: true, message: "Login Successful!", token: token, user: user})
            } else {
                response.json({success: false, message: "Login Failed! Incorrect Password!"})
            }
        } else {
            response.json({success: false, message: "Login Failed! User not found!"})
        }
    } catch (error) {
        console.error("Error during login:", error)
        response.status(500).json({success: false, message: "An error occurred during login."})
    }
})
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
        });

        // Save user to database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!", userId: newUser._id });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
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