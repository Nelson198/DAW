const express = require("express")
const passport = require("passport")
const router = express.Router()

const User = require("../controllers/user")
const Group = require("../controllers/group")

// Route to get all the data for backup
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const backup = {}
    backup.users = await User.listar()
    backup.groups = await Group.listar()

    res.jsonp(backup)
})

// Route to insert all the data from backup
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    await User.insertMany(req.body.users)
    await Group.insertMany(req.body.groups)

    res.jsonp("Successfully updated the database")
})

module.exports = router
