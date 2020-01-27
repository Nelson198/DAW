const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema(
    {
        other: {
            type: String,
            required: true
        },
        messages: {
            type: [String]
        }
    },
    {
        _id: false,
        versionKey: false
    }
)

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
        _id: false,
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
        conversations: {
            type: [ConversationSchema]
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
