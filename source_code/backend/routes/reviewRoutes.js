const express = require("express")
const database = require("../connect")
const ObjectId = require("mongodb").ObjectId

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


//////////////////////////////////////////////////////////////////////////
// Update Routes
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Delete Routes
//////////////////////////////////////////////////////////////////////////


//========================================================================
module.exports = reviewRoutes