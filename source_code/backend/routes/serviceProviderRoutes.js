const express = require("express")
const database = require("../connect")
const ObjectId = require("mongodb").ObjectId

let serviceProviderRoutes = express.Router()

//////////////////////////////////////////////////////////////////////////
// Read Routes
//////////////////////////////////////////////////////////////////////////
/**
 * Request Type: GET 
 * URL: http://localhost:3000/serviceProviders
 * Description: Get all service providers.
*/
// serviceProviderRoutes.route("/serviceProviders").get(async (request, response) => {
//     let db = database.getDb()
//     let data = await db.collection("serviceProviders").find({}).toArray()
//     response.json(data)
// })
serviceProviderRoutes.route("/serviceProviders").get(async (request, response) => {
    try {
        let db = database.getDb();

        // Get pagination parameters (default: page=1, limit=10)
        let page = parseInt(request.query.page) || 1;
        let limit = parseInt(request.query.limit) || 10;
        let skip = (page - 1) * limit;

        // Aggregation pipeline for fetching service providers with user details
        let serviceProviders = await db.collection("service_providers").aggregate([
            {
                $addFields: {
                    user_id: { $toObjectId: "$user_id" } // Convert user_id to ObjectId
                }
            },
            {
                $lookup: {
                    from: "users", // Ensure this is the correct collection name
                    localField: "user_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            { $unwind: "$userDetails" }, // Flatten the array
            {
                $project: {
                    "_id": 1,
                    "status": 1,
                    "ratings": 1,
                    "services": 1,
                    "reviews_count": 1,
                    "userDetails.username": 1,
                    "userDetails.email": 1
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]).toArray();


        // Get total count for pagination info
        let total = await db.collection("service_providers").countDocuments();
        let totalPages = Math.ceil(total / limit);

        response.json({
            total,
            totalPages,
            currentPage: page,
            limit,
            data: serviceProviders
        });

    } catch (error) {
        console.error("Error fetching service providers:", error);
        response.status(500).json({ message: "Internal Server Error" });
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
module.exports = serviceProviderRoutes