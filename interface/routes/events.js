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

router.get("/", verificaAutenticacao, (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    axios.get(`http://localhost:5000/api/events?token=${token}`)
        .then(dados => res.render("evento", { evento: dados.data }))
        .catch(e => res.render("error", { error: e }))
})

router.get("/:id", verificaAutenticacao, async (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    try {
        const user = await axios.get(`http://localhost:5000/api/users/${req.user.email}?token=${token}`)
        const event = await axios.get(`http://localhost:5000/api/events/${req.params.id}?token=${token}`)

        res.render("event", { user: user.data, event: event.data })
    } catch (e) {
        res.render("error", { error: e })
    }
})

module.exports = router
