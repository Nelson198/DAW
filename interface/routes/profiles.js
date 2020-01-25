const express = require("express")
const axios = require("axios")
const jwt = require("jsonwebtoken")
const router = express.Router()

const verificaAutenticacao = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/login")
    }
}

router.get("/:id", verificaAutenticacao, (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    axios.get(`http://localhost:5003/api/groups/${req.params.id}?token=${token}`)
        .then(dados => res.render("evento", { evento: dados.data }))
        .catch(e => res.render("error", { error: e }))
})

module.exports = router
