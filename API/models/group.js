const mongoose = require("mongoose")

const GroupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        public: {
            type: Boolean,
            required: true
        },
        members: {
            type: [String]
        },
        posts: {
            type: [String]
        },
        files: {
            type: [String]
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

module.exports = mongoose.model("group", GroupSchema, "groups")
