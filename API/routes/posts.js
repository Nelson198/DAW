const Posts = require("../controllers/post")
const Users = require("../controllers/user")
const express = require("express")
const passport = require("passport")
const router = express.Router()
const moment = require("moment")
moment.locale("pt-pt")

/* GET posts listing. */
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const data = await Users.findOneByEmail(req.user.email)
        const aux = await Posts.find({ $or: [{ public: true }, { author: req.user.email }, { public: false, author: { $in: data.friends } }, { public: false, group: { $in: data.groups } }] })

        let posts = []
        for (const post of aux) {
            post.author = await Users.findOneByEmail(post.author)

            post.comments.sort((c1, c2) => c1.date - c2.date)
            for (const comment of post.comments) {
                comment.author = await Users.findOneByEmail(comment.author)
                comment.date = moment(comment.date).fromNow()
            }

            posts.push(post)
        }

        res.jsonp(posts)
    } catch (e) {
        res.status(500).jsonp(e)
    }
})

router.get("/hashtags", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const hashtags = await Posts.findHashtags()
        res.jsonp(hashtags)
    } catch (e) {
        res.status(500).jsonp(e)
    }
})

router.get("/hashtags/:hashtag", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const data = await Users.findOneByEmail(req.user.email)
        const aux = await Posts.find({ $or: [{ public: true }, { author: req.user.email }, { public: false, author: { $in: data.friends } }, { public: false, group: { $in: data.groups } }] })

        let posts = []
        for (const post of aux) {
            post.author = await Users.findOneByEmail(post.author)

            post.comments.sort((c1, c2) => c1.date - c2.date)
            for (const comment of post.comments) {
                comment.author = await Users.findOneByEmail(comment.author)
                comment.date = moment(comment.date).fromNow()
            }

            if (post.hashtags.includes(req.params.hashtag))
                posts.push(post)
        }

        res.jsonp(posts)
    } catch (e) {
        res.status(500).jsonp(e)
    }
})

router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Posts.findOneById(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.get("/email/:email", passport.authenticate("jwt", { session: false }), (req, res) => {
    Posts.findByEmail(req.params.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Posts.insert(req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:id/addComment", passport.authenticate("jwt", { session: false }), (req, res) => {
    Posts.addComment(req.params.id, req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.patch("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Posts.updateOne(req.params.id, req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Posts.remove(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

module.exports = router
