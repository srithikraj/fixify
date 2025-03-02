require("dotenv").config({ path: "./config.env" });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("Database connection established");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}

async function insertAdminUser() {
    try {
        const hashedPassword = await bcrypt.hash("admin", 10);

        const adminUser = new User({
            username: "admin",
            password: hashedPassword,
            email: "admin",
            phone: "-",
            first_name: "admin_fn",
            last_name: "admin_ln",
            role: "admin",
            address: {
                line1: "-",
                postal_code: "-",
                province: "-",
                country: "-",
                longitude: 0.0,
                latitude: 0.0
            }
        });

        await adminUser.save();
        console.log("Admin user inserted successfully");
    } catch (error) {
        console.error("Error inserting admin user:", error);
        throw error;
    }
}

// async function main() {
//     try {
//         await connectToDatabase();
//         await insertAdminUser();
//     } finally {
//         await mongoose.disconnect();
//     }
// }

// main();

exports.connectToDatabase = connectToDatabase;
exports.insertAdminUser = insertAdminUser;