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

router.get("/updateProfile", verificaAutenticacao, async (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    try {
        const profile = await axios.get(`http://localhost:5000/api/users/${req.user.email}?token=${token}`)

        res.render("updateProfile", { profile: true, user: profile.data })
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
        const profile = await axios.get(`http://localhost:5000/api/users/${req.params.id}?token=${token}`)

        let posts = []
        for (const postId of profile.data.posts) {
            const post = await axios.get(`http://localhost:5000/api/posts/${postId}?token=${token}`)
            posts.push(post.data)
        }
        profile.data.posts = posts

        res.render("profile", { user: user.data, profile: profile.data, ownProfile: req.user.email == req.params.id })
    } catch (e) {
        res.render("error", { error: e })
    }
})

router.post("/:email/addFriend", verificaAutenticacao, (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    axios.post(`http://localhost:5000/api/users/${req.params.email}/addFriend?token=${token}`, { email: req.body.email })
        .then(r => {
            res.send()
        })
        .catch(err => res.send(err))
})

router.post("/:email/removeFriend", verificaAutenticacao, (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    axios.post(`http://localhost:5000/api/users/${req.params.email}/removeFriend?token=${token}`, { email: req.body.email })
        .then(r => {
            res.send()
        })
        .catch(err => res.send(err))
})

module.exports = router
