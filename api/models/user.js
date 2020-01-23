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
    birthday: {
        type: Date,
        required: true
    },
    friends: {
        type: [String] // mongoose.Schema.Types.ObjectId
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("utilizadores", UserSchema)
