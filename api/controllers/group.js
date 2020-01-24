var Grupo = require("../models/group")

module.exports.find = () => {
    return Grupo.find().exec()
}

module.exports.findOneById = id => {
    return Grupo.findOne({ _id: id }).exec()
}

module.exports.filtrarParticipante = pid => {
    return Grupo.find({ participantes: pid }).exec()
}

module.exports.insert = grupo => {
    var newGroup = new Grupo(grupo)
    return newGroup.save()
}

module.exports.insertMany = grupos => {
    return Grupo.insertMany(grupos).exec()
}

module.exports.remove = id => {
    return Grupo.deleteOne({_id: id}).exec()
}

module.exports.backup = async (groups) => {
    await Group.deleteMany({}).exec()
    await Group.insertMany(groups).exec()
}
