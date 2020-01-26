const Events = require("../controllers/event")
const express = require("express")
const passport = require("passport")
const router = express.Router()

/* GET events listing. */
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Events.find()
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Events.findOneById(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Events.insert(req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:id/addParticipant", passport.authenticate("jwt", { session: false }), (req, res) => {
    Events.addParticipant(req.params.id, req.body.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:id/removeParticipant", passport.authenticate("jwt", { session: false }), (req, res) => {
    Events.removeParticipant(req.params.id, req.body.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.patch("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Events.updateOne(req.params.id, req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Events.remove(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

module.exports = router
