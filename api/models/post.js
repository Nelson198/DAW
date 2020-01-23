const mongoose = require("mongoose")

var PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    hashtags: {
        type: [String]
    },
    description: {
        type: String
    },
    attachments: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("post", PostSchema, "posts")
