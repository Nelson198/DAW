const mongoose = require("mongoose")
const shortid = require("shortid")

var groupSchema = new mongoose.Schema({
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
    admins: {
        type: [String]
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("group", groupSchema, "groups")
