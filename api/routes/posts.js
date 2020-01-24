const Posts = require("../controllers/post")
const express = require("express")
const passport = require("passport")
const router = express.Router()

/* GET posts listing. */
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Posts.find({ $or: [{ public: true }, { author: req.user.email }] })
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Posts.findOneById(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Posts.insert(req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:id/addComment", passport.authenticate("jwt", { session: false }), (req, res) => {
    Posts.addComment(req.params.id, req.body.comment)
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
