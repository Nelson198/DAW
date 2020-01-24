const Utilizadores = require("../controllers/user")
const express = require("express")
const passport = require("passport")
const router = express.Router()

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Utilizadores.find()
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.get("/:email", passport.authenticate("jwt", { session: false }), (req, res) => {
    Utilizadores.findOneByEmail(req.params.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/", (req, res) => {
    Utilizadores.insert(req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.delete("/:email", (req, res) => {
    Utilizadores.remove(req.params.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

module.exports = router
