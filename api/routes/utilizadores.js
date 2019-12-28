const express = require("express")
const passport = require("passport")
let router = express.Router()
let Utilizadores = require("../controllers/utilizadores")

/* GET users listing. */
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    Utilizadores.listar()
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.get("/:email", passport.authenticate("jwt", {session: false}), (req, res) => {
    Utilizadores.consultar(req.params.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/", (req,res) => {
    Utilizadores.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

module.exports = router