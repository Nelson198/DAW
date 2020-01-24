const Groups = require("../controllers/group")
const express = require("express")
const passport = require("passport")
const router = express.Router()

/* GET groups listing. */
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Groups.find({ $or: [{ public: true }, { members: req.user.username }] })
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Groups.findOneById(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
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
