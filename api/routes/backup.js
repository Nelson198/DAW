const Users = require("../controllers/user")
const Groups = require("../controllers/group")
const Posts = require("../controllers/post")
const Events = require("../controllers/event")
const express = require("express")
const passport = require("passport")
const router = express.Router()

// Route to get all the data for backup
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const backup = {}
    backup.users = await Users.find()
    backup.groups = await Groups.find()
    backup.posts = await Posts.find()
    backup.events = await Events.find()

    res.jsonp(backup)
})

// Route to insert all the data from backup
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    await Users.backup(req.body.users)
    await Groups.backup(req.body.groups)
    await Posts.backup(req.body.posts)
    await Events.backup(req.body.events)

    res.jsonp("Successfully updated the database")
})

module.exports = router
