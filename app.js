const { config } = require("dotenv")
const express = require("express")
const mongoose = require("mongoose")
const { startDJ } = require("./dj_config")

// config environment setup
const envFilePath = process.env.NODE_ENV === "development" ? `.env` : `.local.env`
config({
    path: envFilePath
})
console.log(`Now running node in ${process.env.NODE_ENV} environment`)

// express setup
const app = express()

// database setup
mongoose.connect(process.env.MONGO_URI, {}, (error) => {
    if (error) {
        console.log(`MongoDB connection error - ${error}`)
        process.exit(1)
    }
    mongoose.connection.on("error", (error) => console.log(`MongoDB connection error - ${error}`))
    console.log(`MongoDB connection established`)
})

// DJ setup
startDJ()

// routes setup
app.get("/greetings", (req, res, next) => {

    res.status(200).json({
        error: null,
        message: "Hello World!"
    })
})


module.exports = app