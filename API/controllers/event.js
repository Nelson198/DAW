const Event = require("../models/event")
const User = require("../models/user")

module.exports.find = () => {
    return Event.find().exec()
}

module.exports.findOneById = id => {
    return Event.findOne({ _id: id }).exec()
}

module.exports.insert = async (event) => {
    const newEvent = new Event(event)
    await User.updateOne({ email: newEvent.participants[0] }, { $push: { events: newEvent._id } }).exec()
    return newEvent.save()
}

module.exports.remove = id => {
    return Event.deleteOne({ _id: id }).exec()
}

module.exports.backup = async (events) => {
    await Event.deleteMany({})
    await Event.insertMany(events)
}

module.exports.addParticipant = async (id, email) => {
    const event = await Event.findOneAndUpdate({ _id: id }, { $push: { participants: email } }).exec()
    await User.updateOne({ email: email }, { $push: { events: id } }).exec()

    const notification = {
        author: email,
        content: "Alguém se juntou a um evento do qual fazes parte",
        link: `/events/${id}`
    }
    for (const member of event.participants)
        await User.updateOne({ email: member }, { $push: { notifications: notification } }).exec()
}

module.exports.removeParticipant = async (id, email) => {
    await Event.updateOne({ _id: id }, { $pull: { participants: email } }).exec()
    await User.updateOne({ email: email }, { $pull: { events: id } }).exec()
}

module.exports.updateOne = (id, updatedPost) => {
    return Event.updateOne({ _id: id }, { $set: updatedPost }).exec()
}
