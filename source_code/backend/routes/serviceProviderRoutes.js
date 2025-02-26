const express = require("express")
const database = require("../connect")
const ObjectId = require("mongodb").ObjectId

let serviceProviderRoutes = express.Router()



//////////////////////////////////////////////////////////////////////////
// Read Routes
//////////////////////////////////////////////////////////////////////////

//
/**
 * Request Type: GET 
 * URL: http://localhost:3000/serviceProviders/:user_id
 * Description: Get service provider by type.
*/
serviceProviderRoutes.route("/serviceProviders/:user_id").get( async (request,response) => {
    console.log("Backend received request at /serviceProviders/:user_id ")
    let db = database.getDb()
    let data = await db.collection("serviceProviders").findOne({type: request.params.user_id})
    response.json( data )
})
//////////////////////////////////////////////////////////////////////////
// Create Routes
//////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////
// Update Routes
//////////////////////////////////////////////////////////////////////////

//
/**
 * Request Type: PUT
 * URL: http://localhost:3000/serviceProviders/:user_id
 * Description: update service Provider infor by type.
*/
serviceProviderRoutes.route("/serviceProviders/:user_id").put( async (request,response) => {
    let db = database.getDb()
    let serviceProviderSchema={
        $set:{
        user_id: request.body.user_id,
        services:request.body.services,
        availability:request.body.availability,
        }
    }
    let data = await db.collection("serviceProviders").updateOne({user_id: new ObjectId(request.params.user_id)},serviceProviderSchema)
    response.json( data )
})
//////////////////////////////////////////////////////////////////////////
// Delete Routes
//////////////////////////////////////////////////////////////////////////


//========================================================================
module.exports = serviceProviderRoutes