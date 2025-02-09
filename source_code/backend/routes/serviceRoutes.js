const express = require("express")
const database = require("../connect")
const ObjectId = require("mongodb").ObjectId

let serviceRoutes = express.Router()

//////////////////////////////////////////////////////////////////////////
// Read Routes
//////////////////////////////////////////////////////////////////////////

/**
 * Request Type: GET 
 * URL: http://localhost:3000/services
 * Description: Get all services.
*/
serviceRoutes.route("/services").get( async (request,response) => {
    let db = database.getDb()
    let data = await db.collection("services").find({}).toArray()
    response.json( data )
})

/**
 * Request Type: GET 
 * URL: http://localhost:3000/services/${type}
 * Description: Get all services by type.
*/
serviceRoutes.route("/services/:type").get( async (request,response) => {
    let db = database.getDb()
    let data = await db.collection("services").findOne({type: request.params.type})
    response.json( data )
})

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
module.exports = serviceRoutes