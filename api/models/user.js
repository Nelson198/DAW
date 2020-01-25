const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    messages: {
        type: [String]
    }
}, { _id: false })

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ["M", "F", "N"],
        default: "N"
    },
    course: {
        type: String,
        default: "Informatics Student"
    },
    avatar: {
        type: String,
        default: "default.png"
    },
    friends: {
        type: [String]
    },
    posts: {
        type: [String]
    },
    groups: {
        type: [String]
    },
    friendRequests: {
        type: [String]
    },
    conversations: {
        type: [ConversationSchema]
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("user", UserSchema, "users")
