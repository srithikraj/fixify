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

/**
 * Request Type: GET
 * URL: http://localhost:3000/reviews/top
 * Description: Get the top five reviews given by customers, displaying their names and comments.
 */
// GET Top 5 Reviews
reviewRoutes.route("/reviews/top").get(async (req, res) => {
    let db = database.getDb()
    try {
        const topReviews = await db.collection("reviews").find().lean();
        console.log( topReviews );
            //.populate("consumer", "name") // Fetch consumer name
            //.sort({ rating: -1}) // Sort by highest rating & newest
            //.limit(5);

        // const formattedReviews = topReviews.map((rev) => ({
        //     customerName: rev.consumer.name,
        //     description: rev.description,
        //     rating: rev.rating,
       // }));

        res.json(topReviews);
    } catch (error) {
        console.error("Error fetching top reviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



//////////////////////////////////////////////////////////////////////////
// Create Routes
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Update Routes
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Delete Routes
//////////////////////////////////////////////////////////////////////////


//========================================================================
module.exports = reviewRoutes