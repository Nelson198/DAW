const Event = require("../models/event")

module.exports.find = () => {
    return Event.find().exec()
}

module.exports.findOneById = id => {
    return Event.findOne({ _id: id }).exec()
}

module.exports.insert = event => {
    const newEvent = new Event(event)
    return newEvent.save()
}

module.exports.remove = id => {
    return Event.deleteOne({ _id: id }).exec()
}

module.exports.backup = async (events) => {
    await Event.deleteMany({}).exec()
    await Event.insertMany(events).exec()
}

module.exports.addParticipant = (id, email) => {
    return Event.updateOne({ _id: id }, { $push: { participants: email } }).exec()
}

module.exports.removeParticipant = (id, email) => {
    return Event.updateOne({ _id: id }, { $pull: { participants: email } }).exec()
}

module.exports.updateOne = (id, updatedPost) => {
    return Event.updateOne({ _id: id }, { $set: updatedPost }).exec()
}
