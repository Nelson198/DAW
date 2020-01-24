var User = require("../models/user")

module.exports.find = () => {
    return User.find().exec()
}

module.exports.findOneByEmail = email => {
    return User.findOne({ email: email }).exec()
}

module.exports.insert = user => {
    var newUser = new User(user)
    return newUser.save()
}

module.exports.insertMany = users => {
    return User.insertMany(users).exec()
}

module.exports.remove = email => {
    return User.deleteOne({ email: email }).exec()
}

module.exports.backup = async (users) => {
    await User.deleteMany({}).exec()
    await User.insertMany(users).exec()
}
