const mongoose = require("mongoose")

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
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("user", UserSchema, "users")
