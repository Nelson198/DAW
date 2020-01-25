const express = require("express")
const axios = require("axios")
const passport = require("passport")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()

const verificaAutenticacao = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/login")
    }
}

router.get("/", verificaAutenticacao, (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    axios.get(`http://localhost:5003/api/posts?token=${token}`)
        .then(dados => res.render("feed", { lista: dados.data }))
        .catch(e => res.render("error", { error: e }))
})

router.get("/logout", verificaAutenticacao, (req, res) => {
    req.logout()
    res.redirect("/")
})

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
    const hash = bcrypt.hashSync(req.body.password, 10)
    axios.post("http://localhost:5003/api/users", {
        email: req.body.email,
        name: req.body.nome,
        password: hash
    })
        .then(dados => res.redirect("/"))
        .catch(e => res.render("error", { error: e }))
})

module.exports = router
