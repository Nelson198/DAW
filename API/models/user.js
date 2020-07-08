const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
)

const UserSchema = new mongoose.Schema(
    {
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
            enum: ["female", "male"],
            required: true
        },
        birthday: {
            type: Date,
            required: true
        },
        course: {
            type: String,
            required: true
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
        events: {
            type: [String]
        },
        friendRequests: {
            type: [String]
        },
        notifications: {
            type: [NotificationSchema]
        },
        creationDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model("user", UserSchema, "users")
