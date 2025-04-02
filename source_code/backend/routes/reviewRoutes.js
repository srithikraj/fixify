const express = require("express")
const database = require("../connect")
const ObjectId = require("mongodb").ObjectId
const Review = require("../models/reviewModel")

let reviewRoutes = express.Router()

//////////////////////////////////////////////////////////////////////////
// Read Routes
//////////////////////////////////////////////////////////////////////////
/**
 * Request Type: GET 
 * URL: http://localhost:3000/reviews/${id}
 * Description: Get all reviews by user's ObjectId.
*/
// reviewRoutes.route("/reviews/:id").get( async (request,response) => {
//     let db = database.getDb()
//     let data = await db.collection("reviews").findOne({_id: ObjectId.createFromHexString(request.params.id)})
//     response.json( data )
// })

//////////////////////////////////////////////////////////////////////////
// Create Routes
//////////////////////////////////////////////////////////////////////////
reviewRoutes.route("/reviews/top").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("reviews")
            .find({})
            .sort({ rating: -1, createdAt: -1 }) // Sort by rating (high to low) and latest first
            .limit(5)
            .toArray();
        console.log(data);

        response.json(data);
    } catch (error) {
        response.status(500).json({ message: "Error fetching top reviews", error });
    }
});

reviewRoutes.get("/reviews/worker-reviews/:workerId", async (req, res) => {
    // console.log("Fetching reviews for worker:", req.params.workerId);
    try {
      const { workerId } = req.params;
      const reviews = await Review.find({ provider: workerId });
      res.status(200).json({ success: true, reviews });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ success: false, message: "Server error while fetching reviews" });
    }
  });


  /// write review

  reviewRoutes.post("/reviews", async (req, res) => {
    try {
      const { consumer, provider, description, rating } = req.body;
  
      // Validate input: ensure rating is provided and is between 1 and 5
      if (!consumer || !provider || !description || rating === undefined || rating < 1 || rating > 5) {
        return res.status(400).json({ 
          success: false, 
          message: "All fields are required and rating must be between 1 and 5." 
        });
      }
      
      console.log("Creating review:", req.body);
  
      // Create a new review instance
      const newReview = new Review({
        consumer,
        provider,
        description,
        rating
      });
  
      // Save the review to the database
      const savedReview = await newReview.save();
  
      res.status(201).json({ success: true, review: savedReview });
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ success: false, message: "Server error while creating review" });
    }
  });
  


//////////////////////////////////////////////////////////////////////////
// Update Routes
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Delete Routes
//////////////////////////////////////////////////////////////////////////


//========================================================================
module.exports = reviewRoutes