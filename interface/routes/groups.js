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

router.get("/", verificaAutenticacao, async (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    try {
        const user = await axios.get(`http://localhost:5000/api/users/${req.user.email}?token=${token}`)
        const groups = await axios.get(`http://localhost:5000/api/groups?token=${token}`)

        res.render("groups", { groups: groups.data, user: user.data, groupId: true })
    } catch (e) {
        res.render("error", { error: e })
    }
})

router.get("/:id", verificaAutenticacao, async (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    try {
        const user = await axios.get(`http://localhost:5000/api/users/${req.user.email}?token=${token}`)
        const group = await axios.get(`http://localhost:5000/api/groups/${req.params.id}?token=${token}`)

        res.render("group", { group: group.data, user: user.data, groupId: req.params.id })
    } catch (e) {
        res.render("error", { error: e })
    }
})

router.post("/:email/joinGroup", verificaAutenticacao, (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    axios.post(`http://localhost:5000/api/users/${req.params.email}/joinGroup?token=${token}`, { _id: req.body._id })
        .then(r => {
            res.send()
        })
        .catch(err => res.send(err))
})

router.post("/:email/leaveGroup", verificaAutenticacao, (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    axios.post(`http://localhost:5000/api/users/${req.params.email}/leaveGroup?token=${token}`, { _id: req.body._id })
        .then(r => {
            res.send()
        })
        .catch(err => res.send(err))
})

router.post("/createGroup", verificaAutenticacao, (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    req.body.public = req.body.public == "public"
    req.body.members = [req.user.email]

    axios.post(`http://localhost:5000/api/groups?token=${token}`, req.body)
        .then(r => {
            res.send()
        })
        .catch(err => res.send(err))
})

router.post("/createEvent", verificaAutenticacao, (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    axios.post(`http://localhost:5000/api/events?token=${token}`, req.body)
        .then(r => {
            res.send()
        })
        .catch(err => res.send(err))
})

module.exports = router
