const mongoose = require("mongoose")
const shortid = require("shortid")

const GroupSchema = new mongoose.Schema({
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
    joinKey: {
        type: String,
        default: shortid.generate
    },
    members: {
        type: [String]
    },
    posts: {
        type: [String]
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("group", GroupSchema, "groups")
