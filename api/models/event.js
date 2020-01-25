const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    participants: {
        type: [String]
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("event", EventSchema, "events")
