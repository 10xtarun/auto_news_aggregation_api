const { config } = require("dotenv")
const express = require("express")
const mongoose = require("mongoose")

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

// routes setup
app.get("/greetings", (req, res, next) => {

    res.status(200).json({
        error: null,
        message: "Hello World!"
    })
})

app.listen(process.env.PORT, (error) => {
    if (error) throw error
    console.log(`Server is listening on PORT : ${process.env.PORT}`)
})