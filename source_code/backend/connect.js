require("dotenv").config( { path: "./config.env" } )
const mongoose = require('mongoose')

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

module.exports = {
    connectToServer: () => {
        return mongoose.connect(process.env.ATLAS_URI, clientOptions)
    },
    getDb: () => {
        return mongoose.connection.db
    }
}