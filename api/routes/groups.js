const express = require("express")
let router = express.Router()
let Eventos = require("../controllers/group")

/* GET users listing. */
router.get("/", (req, res) => {
    if (req.query.participante) {
        Eventos.filtrarParticipante(req.query.participante)
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).jsonp(e))
    } else {
        Eventos.listar()
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).jsonp(e))
    }
})

router.get("/:id", (req, res) => {
    Eventos.consultar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

module.exports = router