const User = require("../models/user")
const Group = require("../models/group")

module.exports.find = () => {
    return User.find().exec()
}

module.exports.findOneByEmail = email => {
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
    await User.updateOne({ email: email }, { $pull: { friendRequests: newFriend }, $push: { friends: newFriend } }).exec()
    await User.updateOne({ email: newFriend }, { $push: { friends: email } }).exec()
}

module.exports.removeFriend = async (email, friend) => {
    await User.updateOne({ email: email }, { $pull: { friends: friend } }).exec()
    await User.updateOne({ email: newFriend }, { $pull: { friends: email } }).exec()
}

module.exports.updateOne = (email, updatedUser) => {
    return User.updateOne({ email: email }, { $set: updatedUser }).exec()
}

module.exports.joinGroup = async (email, groupKey) => {
    await Group.updateOne({ joinKey: groupKey }, { $push: { members: email } })
    await User.updateOne({ email: email }, { $push: { friendRequests: email } }).exec()
}

module.exports.leaveGroup = async (email, groupKey) => {
    await Group.updateOne({ joinKey: groupKey }, { $pull: { members: email } })
    await User.updateOne({ email: email }, { $pull: { friendRequests: email } }).exec()
}
