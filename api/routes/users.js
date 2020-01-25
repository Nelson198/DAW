const Users = require("../controllers/user")
const express = require("express")
const passport = require("passport")
const bcrypt = require("bcrypt")
const router = express.Router()

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Utilizadores.find({}, { _id: 0, email: 1, name: 1, avatar: 1 })
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.get("/:email", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const dados = await Users.findOneByEmail(req.params.email)
        const user = dados.toObject()

        let friends = []
        for (const friendEmail of user.friends) {
            const friend = await Users.findOneByEmail(friendEmail)
            friends.push(friend)
        }
        user.friends = friends

        res.jsonp(user)
    } catch (e) {
        res.status(500).jsonp(e)
    }
})

router.post("/", (req, res) => {
    Users.insert(req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/addFriend", (req, res) => {
    Users.addFriend(req.params.email, req.body.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/acceptFriend", (req, res) => {
    Users.acceptFriend(req.params.email, req.body.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/removeFriend", (req, res) => {
    Users.removeFriend(req.params.email, req.body.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/joinGroup", (req, res) => {
    Users.joinGroup(req.params.email, req.body.joinKey)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/leaveGroup", (req, res) => {
    Users.leaveGroup(req.params.email, req.body.joinKey)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.patch("/:email", (req, res) => {
    // Hash the password if it exists
    if (req.body.password)
        req.body.password = bcrypt.hashSync(req.body.password, 10)

    Users.updateOne(req.params.email, req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.delete("/:email", passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.remove(req.params.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

module.exports = router
