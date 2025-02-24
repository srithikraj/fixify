const express = require("express")
const database = require("../connect")
const ObjectId = require("mongodb").ObjectId
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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

//////////////////////////////////////////////////////////////////////////
// Update Routes
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Delete Routes
//////////////////////////////////////////////////////////////////////////


//========================================================================
module.exports = userRoutes