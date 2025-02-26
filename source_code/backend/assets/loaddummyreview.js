require("dotenv").config( { path: "../config.env" } )
const mongoose = require('mongoose');
const Review = require('../models/reviewModel');
 
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
 
async function insertAdminReview() {
 
    try {
        await mongoose.connect(process.env.ATLAS_URI, clientOptions);
        console.log("Database connection established");
 
        
 
        const adminReview = new Review({
            consumer: new mongoose.Types.ObjectId('67bab1eeae60da9d8824fd32'), //{ '$ref': 'user', '$id': '67bab1eeae60da9d8824fd32' } , // Reference to User model
            provider: new mongoose.Types.ObjectId('67bab1eeae60da9d8824fd32'), // Reference to User model
            description: "The plumbing service was amazing",
            rating: 5.0
            
        });
 
        await adminReview.save();
        console.log("Review inserted successfully");
    } catch (error) {
        console.error("Error inserting Review", error);
    } finally {
        await mongoose.disconnect();
    }
}
 
insertAdminReview();
 