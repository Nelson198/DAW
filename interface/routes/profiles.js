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

router.get("/:id", verificaAutenticacao, async (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    try {
        const profile = await axios.get(`http://localhost:5000/api/users/${req.user.email}?token=${token}`)

        let posts = []
        for (const postId of profile.data.posts) {
            const post = await axios.get(`http://localhost:5000/api/posts/${postId}?token=${token}`)
            posts.push(post.data)
        }
        profile.data.posts = posts

        res.render("profile", { user: profile.data })
    } catch (e) {
        res.render("error", { error: e })
    }
})

module.exports = router
