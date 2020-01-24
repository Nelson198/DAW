const Posts = require("../controllers/post")
const express = require("express")
const router = express.Router()

/* GET users listing. */
router.get("/", (req, res) => {
    Posts.find()
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.get("/:id", (req, res) => {
    Posts.findOneById(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.post("/", (req, res) => {
    Posts.insert(req.body)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

router.delete("/:id", (req, res) => {
    Posts.remove(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
})

module.exports = router