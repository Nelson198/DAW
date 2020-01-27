const express = require("express")
const axios = require("axios")
const passport = require("passport")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const verificaAutenticacao = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/login")
    }
}

router.get("/", verificaAutenticacao, async (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    try {
        const posts = await axios.get(`http://localhost:5000/api/posts?token=${token}`)
        const user = await axios.get(`http://localhost:5000/api/users/${req.user.email}?token=${token}`)

        res.render("feed", { posts: posts.data, user: user.data })
    } catch (e) {
        res.render("error", { error: e })
    }
})

router.get("/friendRequests", verificaAutenticacao, async (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    try {
        const user = await axios.get(`http://localhost:5000/api/users/${req.user.email}?token=${token}`)

        res.render("friendRequests", { user: user.data })
    } catch (e) {
        res.render("error", { error: e })
    }
})

router.get("/createGroup", verificaAutenticacao, async (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    try {
        const user = await axios.get(`http://localhost:5000/api/users/${req.user.email}?token=${token}`)

        res.render("createGroup", { user: user.data })
    } catch (e) {
        res.render("error", { error: e })
    }
})

router.get("/createEvent", verificaAutenticacao, async (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    try {
        const user = await axios.get(`http://localhost:5000/api/users/${req.user.email}?token=${token}`)

        res.render("createEvent", { user: user.data })
    } catch (e) {
        res.render("error", { error: e })
    }
})

router.get("/logout", verificaAutenticacao, (req, res) => {
    req.logout()
    res.redirect("/login")
})

router.get("/login", (req, res) => {
    let success = true
    if ("success" in req.query)
        success = false

    res.render("login", { success: success })
})

router.get("/register", (req, res) => {
    res.render("register")
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?success=false",
})
)

router.post("/register", (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10)
    axios.post("http://localhost:5000/api/users", {
        email: req.body.email,
        course: req.body.course,
        name: req.body.name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        password: hash
    })
        .then(dados => res.redirect("/login"))
        .catch(e => res.render("error", { error: e }))
})


router.post("/:postId/addComment", verificaAutenticacao, (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    req.body.author = req.user.email

    axios.post(`http://localhost:5000/api/posts/${req.params.postId}/addComment?token=${token}`, req.body)
        .then(r => {
            res.redirect(`/#${req.params.postId}`)
        })
        .catch(err => res.send(err))
})

router.post("/newPost", verificaAutenticacao, upload.array('file'), (req, res) => {
    const token = jwt.sign({ email: req.user.email }, "tpDAW1920", {
        expiresIn: 3000
    })

    req.files.forEach((file, index) => {
        let oldPath = __dirname + '/../' + file.path
        let newPath = __dirname + '/../public/files/' + file.originalname
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err
        })

        req.body.attachments({ $push: {} })
    })

    req.body.author = req.user.email

    if (req.body.public == "public")
        req.body.public = true
    else if (req.body.group == "private")
        req.body.public = false
    else {
        req.body.group = req.body.public
        req.body.public = false
    }

    axios.post(`http://localhost:5000/api/posts?token=${token}`, (req.body, req.files))
        .then(r => {
            res.redirect("/")
        })
        .catch(err => res.send(err))
})

module.exports = router
