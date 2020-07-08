const User = require("../models/user")
const Group = require("../models/group")

module.exports.find = () => {
    return User.find().exec()
}

module.exports.findOneByEmail = async (email) => {
    return User.findOne({ email: email }).exec()
}

module.exports.insert = user => {
    const newUser = new User(user)
    return newUser.save()
}

module.exports.remove = email => {
    return User.deleteOne({ email: email }).exec()
}

module.exports.backup = async (users) => {
    await User.deleteMany({})
    await User.insertMany(users)
}

module.exports.addFriend = async (email, newFriend) => {
    await User.updateOne({ email: newFriend }, { $push: { friendRequests: email } }).exec()
}

module.exports.acceptFriend = async (email, newFriend) => {
    const notification = {
        author: email,
        content: "O teu pedido de amizade foi aceite",
        link: `/profiles/${email}`
    }
    await User.updateOne({ email: email }, { $pull: { friendRequests: newFriend }, $push: { friends: newFriend } }).exec()
    await User.updateOne({ email: newFriend }, { $push: { friends: email, notifications: notification } }).exec()
}

module.exports.rejectFriend = async (email, rejectFriend) => {
    await User.updateOne({ email: email }, { $pull: { friendRequests: rejectFriend } }).exec()
}

module.exports.removeFriend = async (email, friend) => {
    await User.updateOne({ email: email }, { $pull: { friends: friend } }).exec()
    await User.updateOne({ email: friend }, { $pull: { friends: email } }).exec()
}

module.exports.updateOne = (email, updatedUser) => {
    return User.updateOne({ email: email }, { $set: updatedUser }).exec()
}

module.exports.joinGroup = async (email, groupId) => {
    const group = await Group.findOneAndUpdate({ _id: groupId }, { $push: { members: email } }).exec()
    await User.updateOne({ email: email }, { $push: { groups: groupId } }).exec()

    const notification = {
        author: email,
        content: "Alguém se juntou a um grupo do qual fazes parte",
        link: `/groups/${groupId}`
    }
    for (const member of group.members)
        await User.updateOne({ email: member }, { $push: { notifications: notification } }).exec()
}

module.exports.leaveGroup = async (email, groupId) => {
    await Group.updateOne({ _id: groupId }, { $pull: { members: email } }).exec()
    await User.updateOne({ email: email }, { $pull: { groups: groupId } }).exec()
}

module.exports.removeNotification = async (email, notificationId) => {
    return User.updateOne({ email: email }, { $pull: { notifications: { _id: notificationId } } }).exec()
}
