const Group = require("../models/group")

module.exports.find = () => {
    return Group.find().exec()
}

module.exports.findOneById = id => {
    return Group.findOne({ _id: id }).exec()
}

module.exports.insert = grupo => {
    const newGroup = new Group(grupo)
    return newGroup.save()
}

module.exports.remove = id => {
    return Group.deleteOne({ _id: id }).exec()
}

module.exports.backup = async (groups) => {
    await Group.deleteMany({})
    await Group.insertMany(groups)
}

module.exports.updateOne = (groupKey, updatedGroup) => {
    return User.updateOne({ joinKey: groupKey }, { $set: updatedGroup }).exec()
}
