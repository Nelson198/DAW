const User = require("../controllers/user")
const Group = require("../controllers/group")
const express = require("express")
const passport = require("passport")
const router = express.Router()

// Route to get all the data for backup
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const backup = {}
    backup.users = await User.find()
    backup.groups = await Group.find()

    res.jsonp(backup)
})

// Route to insert all the data from backup
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    await User.insertMany(req.body.users)
    await Group.insertMany(req.body.groups)

    res.jsonp("Successfully updated the database")
})

module.exports = router
