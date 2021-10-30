const mongoose = require("mongoose")

const carNews = new mongoose.Schema({
    link: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        default: "default title"
    },
    content: {
        type: String,
        default: undefined
    },
    parsed: {
        type: Boolean,
        required: true,
        default: false
    },
    posted: {
        type: Boolean,
        required: true,
        default: false
    }
})

const CarNews = mongoose.model("carnews", carNews)

module.exports = {
    CarNews
}