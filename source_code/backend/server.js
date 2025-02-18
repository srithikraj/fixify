const connect = require("./connect")
const express = require("express")
const cors = require("cors")
const users = require("./routes/userRoutes")
const services = require("./routes/serviceRoutes")
const serviceProviders = require("./routes/serviceProviderRoutes")
const reviews = require("./routes/reviewRoutes")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use(users)
app.use(services)
app.use(serviceProviders)
app.use(reviews)


connect.connectToServer().then(() => {
    console.log("BACKEND: Successfully connected to DB!")
    app.listen( PORT, () => {
        console.log(`BACKEND: Successfully started backend server! Listening on port ${PORT}`)
    })
}).catch((error) => {
    console.log("BACKEND: Failed to connect to DB!")
    console.log(error)
})
