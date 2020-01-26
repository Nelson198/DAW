const Groups = require("../controllers/group")
const Users = require("../controllers/user")
const Posts = require("../controllers/post")
const express = require("express")
const passport = require("passport")
const fs = require("fs")
const path = require("path")
const router = express.Router()

// Function that converts an image to base64 encoding
function base64(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err)
                return reject(err)

            resolve("data:image/" + path.extname(filename).substr(1) + ";base64," + data.toString("base64"))
        })
    })
}

/* GET groups listing. */
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Groups.find({ $or: [{ public: true }, { members: req.user.username }] })
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.get("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const dados = await Groups.findOneById(req.params.id)
        const group = dados.toObject()

        let members = []
        for (const memberEmail of group.members) {
            const member = await Users.findOneByEmail(memberEmail)
            member.avatar = await base64(`data/avatars/${member.avatar}`)
            members.push(member)
        }
        group.members = members

        let posts = []
        for (const postId of group.posts) {
            const post = await Posts.findOneById(postId)

            const author = await Users.findOneByEmail(post.author)
            author.avatar = await base64(`data/avatars/${author.avatar}`)
            post.author = author

            posts.push(post)
        }
        group.posts = posts

        res.jsonp(group)
    } catch (e) {
        res.status(500).jsonp(e)
    }
})

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Groups.insert(req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.patch("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Groups.updateOne(req.params.id, req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Groups.remove(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

module.exports = router
