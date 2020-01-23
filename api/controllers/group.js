var Grupo = require("../models/group")

module.exports.listar = () => {
    return Grupo
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Grupo
        .findOne({ _id: id })
        .exec()
}

module.exports.filtrarParticipante = pid => {
    return Grupo
        .find({ participantes: pid })
        .exec()
}

module.exports.insertMany = grupos => {
    return Grupo.insertMany(grupos).exec()
}
