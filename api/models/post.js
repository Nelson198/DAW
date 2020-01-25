const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    hashtags: {
        type: [String]
    },
    attachments: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        required: true
    },
    group: {
        type: String,
        default: null
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
    comments: {
        type: [CommentSchema]
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("post", PostSchema, "posts")
