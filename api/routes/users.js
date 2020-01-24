const Utilizadores = require("../controllers/user")
const express = require("express")
const passport = require("passport")
const router = express.Router()

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Utilizadores.find({}, { _id: 0, email: 1, name: 1, avatar: 1 })
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.get("/:email", passport.authenticate("jwt", { session: false }), (req, res) => {
    Utilizadores.findOneByEmail(req.params.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/", (req, res) => {
    Utilizadores.insert(req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/addFriend", (req, res) => {
    Utilizadores.addFriend(req.params.email, req.body.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/acceptFriend", (req, res) => {
    Utilizadores.acceptFriend(req.params.email, req.body.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/removeFriend", (req, res) => {
    Utilizadores.removeFriend(req.params.email, req.body.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/joinGroup", (req, res) => {
    Utilizadores.joinGroup(req.params.email, req.body.joinKey)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/leaveGroup", (req, res) => {
    Utilizadores.leaveGroup(req.params.email, req.body.joinKey)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.patch("/:email", (req, res) => {
    Utilizadores.updateOne(req.params.email, req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.delete("/:email", passport.authenticate("jwt", { session: false }), (req, res) => {
    Utilizadores.remove(req.params.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

module.exports = router
