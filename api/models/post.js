const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        _id: false,
        versionKey: false
    }
)

const PostSchema = new mongoose.Schema(
    {
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
            type: String,
            required: true
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
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model("post", PostSchema, "posts")
