const express = require("express")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const mongoose = require("mongoose")

// Estabelecer a ligação à base de dados
mongoose.connect("mongodb://127.0.0.1:27017/daw2019-agenda", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Servidor Mongo da API da agenda a correr..."))
    .catch((erro) => console.log("Mongo: erro na conexão: " + erro))

// Configurar a autenticação com JWT
const passport = require("passport")
const JWTStrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt

const extractFromQS = (req) => {
    var token = null
    if (req.query && req.query.token) token = req.query.token
    return token
}

const extractFromBody = (req) => {
    var token = null
    if (req.body && req.body.token) token = req.body.token
    return token
}

passport.use(new JWTStrategy({
    secretOrKey: "tpDAW1920",
    jwtFromRequest: ExtractJWT.fromExtractors([extractFromQS, extractFromBody])
}, async (payload, done) => {
    try {
        return done(null, payload)
    }
    catch (error) {
        return done(error)
    }
}))
///////

// Configurar as rotas
const app = express()

app.use(passport.initialize())

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/api/eventos", require("./routes/eventos"))
app.use("/api/utilizadores", require("./routes/utilizadores"))

app.use("*", (req, res) => {
    res.status(404).json({ error: "Innefective route." })
})

module.exports = app
