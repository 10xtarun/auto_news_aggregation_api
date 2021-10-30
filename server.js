const { config } = require("dotenv")
const express = require("express")

// config environment setup
const envFilePath = process.env.NODE_ENV === "development" ? `.env` : `.local.env`
config({
    path: envFilePath
})
console.log(`Now running node in ${process.env.NODE_ENV}`)

// express setup
const app = express()

// routes setup
app.get("/greetings", (req, res ,next) => {
    res.status(200).json({
        error: null,
        message: "Hello World!"
    })
})

app.listen(process.env.PORT, (error) => {
    if(error) throw error
    console.log(`Server is listening on PORT : ${process.env.PORT}`)
})