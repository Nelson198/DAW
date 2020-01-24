const express = require("express")
const axios = require("axios")
const passport = require("passport")
const bcrypt = require("bcryptjs")
let router = express.Router()

let verificaAutenticacao = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/login")
    }
}

router.get("/", verificaAutenticacao, (req, res) => {
    axios.get("http://localhost:5003/api/eventos")
        .then(dados => res.render("feed", { lista: dados.data }))
        .catch(e => res.render("error", { error: e }))
})

router.get("/eventos/:id", verificaAutenticacao, (req, res) => {
    axios.get("http://localhost:5003/api/eventos/" + req.params.id)
        .then(dados => res.render("evento", { evento: dados.data }))
        .catch(e => res.render("error", { error: e }))
})

router.get("/logout", verificaAutenticacao, (req, res) => {
    req.logout()
    res.redirect("/")
})
/* Only for testting interface
router.get("/feed", (req, res) => {
    res.render("feed")
}) 
*/
router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/register", (req, res) => {
    res.render("register")
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    successFlash: "Utilizador autenticado com sucesso!",
    failureRedirect: "/login",
    failureFlash: "Utilizador ou password inválido(s)..."
})
)

router.post("/register", (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 10)
    axios.post("http://localhost:5003/api/utilizadores", {
        email: req.body.email,
        nome: req.body.nome,
        password: hash
    })
        .then(dados => res.redirect("/"))
        .catch(e => res.render("error", { error: e }))
})

/**
 * Other HTTP request
 */
router.all("*", (req, res, next) => {
    res.status(500).render("error", { erro: "Pedido HTTP não suportado !", route: `${req.protocol}://${req.get("host")}${req.originalUrl}` })
})

module.exports = router
