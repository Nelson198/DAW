const Posts = require("../controllers/post")
const express = require("express")
const router = express.Router()

/* GET users listing. */
router.get("/", (req, res) => {
    if (req.query.participante) {
        Posts.filtrarParticipante(req.query.participante)
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).jsonp(e))
    } else {
        Posts.find()
            .then(dados => res.jsonp(dados))
            .catch(e => res.status(500).jsonp(e))
    }
})

router.get("/:id", (req, res) => {
    Posts.findOneById(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

module.exports = router