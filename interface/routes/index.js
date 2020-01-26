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

router.get("/", verificaAutenticacao, async (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    try {
        const posts = await axios.get(`http://localhost:5000/api/posts?token=${token}`)
        const user = await axios.get(`http://localhost:5000/api/users/${req.user.email}?token=${token}`)

        res.render("feed", { posts: posts.data, user: user.data })
    } catch (e) {
        res.render("error", { error: e })
    }
})

router.get("/friendRequests", verificaAutenticacao, async (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    try {
        const user = await axios.get(`http://localhost:5000/api/users/${req.user.email}?token=${token}`)

        res.render("friendRequests", { user: user.data })
    } catch (e) {
        res.render("error", { error: e })
    }
})

router.get("/logout", verificaAutenticacao, (req, res) => {
    req.logout()
    res.redirect("/login")
})

router.get("/login", (req, res) => {
    let success = true
    if ("success" in req.query)
        success = false

    res.render("login", { success: success })
})

router.get("/register", (req, res) => {
    res.render("register")
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?success=false",
})
)

router.post("/register", (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10)
    axios.post("http://localhost:5000/api/users", {
        email: req.body.email,
        course: req.body.course,
        name: req.body.name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        password: hash
    })
        .then(dados => res.redirect("/login"))
        .catch(e => res.render("error", { error: e }))
})

module.exports = router
