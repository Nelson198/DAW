const Group = require("../models/group")
const User = require("../models/user")

module.exports.find = (condition) => {
    return Group.find(condition).exec()
}

module.exports.findOneById = id => {
    return Group.findOne({ _id: id }).exec()
}

module.exports.insert = async (grupo) => {
    const newGroup = new Group(grupo)
    await User.updateOne({ email: newGroup.members[0] }, { $push: { groups: newGroup._id } }).exec()
    return newGroup.save()
}

module.exports.remove = id => {
    return Group.deleteOne({ _id: id }).exec()
}

module.exports.backup = async (groups) => {
    await Group.deleteMany({})
    await Group.insertMany(groups)
}

module.exports.updateOne = (groupId, updatedGroup) => {
    return Group.updateOne({ _id: groupId }, { $set: updatedGroup }).exec()
}
