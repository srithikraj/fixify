require("dotenv").config( { path: "./config.env" } )
const mongoose = require('mongoose')

module.exports = {
    connectToServer: () => {
        return mongoose.connect(process.env.ATLAS_URI)
    },
    getDb: () => {
        return mongoose.connection.db
    }
}