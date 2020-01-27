const Users = require("../controllers/user")
const Groups = require("../controllers/group")
const Events = require("../controllers/event")
const express = require("express")
const passport = require("passport")
const bcrypt = require("bcrypt")
const moment = require("moment")
const router = express.Router()

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Users.find({}, { _id: 0, email: 1, name: 1 })
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.get("/:email", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const dados = await Users.findOneByEmail(req.params.email)
        if (!dados)
            return res.jsonp()

        const user = dados.toObject()

        let friends = []
        for (const friendEmail of user.friends) {
            const friend = await Users.findOneByEmail(friendEmail)
            friends.push(friend)
        }
        user.friends = friends

        let friendRequests = []
        for (const frEmail of user.friendRequests) {
            const friend = await Users.findOneByEmail(frEmail)
            friendRequests.push(friend)
        }
        user.friendRequests = friendRequests

        let groups = []
        for (const groupId of user.groups) {
            const group = await Groups.findOneById(groupId)
            groups.push(group)
        }
        user.groups = groups

        let events = []
        for (const eventId of user.events) {
            const event = await Events.findOneById(eventId)
            events.push(event)
        }
        user.events = events

        user.birthdayDate = moment(user.birthday).format('YYYY-MM-DD')
        user.birthday = moment(user.birthday).format('DD-MM-YYYY') + " (" + moment(user.birthday).fromNow("years") + ")"

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

router.post("/:email/rejectFriend", (req, res) => {
    Users.rejectFriend(req.params.email, req.body.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/removeFriend", (req, res) => {
    Users.removeFriend(req.params.email, req.body.email)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/joinGroup", (req, res) => {
    Users.joinGroup(req.params.email, req.body._id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/:email/leaveGroup", (req, res) => {
    Users.leaveGroup(req.params.email, req.body._id)
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
