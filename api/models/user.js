const mongoose = require("mongoose")

var UserSchema = new mongoose.Schema({
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
    avatar: {
        type: String,
        default: ""
    },
    birthday: {
        type: Date,
        required: true
    },
    friends: {
        type: [String]
    },
    posts: {
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
