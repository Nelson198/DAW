const Groups = require("../controllers/group")
const express = require("express")
const router = express.Router()

/* GET users listing. */
router.get("/", (req, res) => {
    if (req.query.participante) {
        Groups.filtrarParticipante(req.query.participante)
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).jsonp(e))
    } else {
        Groups.find()
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).jsonp(e))
    }
})

router.get("/:id", (req, res) => {
    Groups.findOneById(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/", (req, res) => {
    Groups.insert(req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.delete("/:id", (req, res) => {
    Groups.remove(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

module.exports = router
