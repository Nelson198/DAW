const express = require("express")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const mongoose = require("mongoose")
const { app, server } = require("./socket")

// Estabelecer a ligação à base de dados
mongoose.connect("mongodb://127.0.0.1:27017/ISN", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Servidor Mongo da API a correr ..."))
    .catch((erro) => console.log("Mongo: erro na conexão: " + erro))

// Configurar a autenticação com JWT
const passport = require("passport")
const JWTStrategy = require("passport-jwt").Strategy

passport.use(new JWTStrategy({
    secretOrKey: "tpDAW1920",
    jwtFromRequest: (req) => {
        let token = null
        if (req.query && req.query.token)
            token = req.query.token
        return token
    }
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
app.use(passport.initialize())

app.use(logger("dev"))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/* Pretty JSON setup */
app.set("json spaces", 4)

app.use("/api/groups", require("./routes/groups"))
app.use("/api/users", require("./routes/users"))
app.use("/api/posts", require("./routes/posts"))
app.use("/api/events", require("./routes/events"))
app.use("/api/backup", require("./routes/backup"))

app.use("*", (req, res) => {
    res.status(404).json({ error: "Innefective route." })
})

server.listen(5000, () => console.log(`Servidor da API à escuta na porta 5000 ...`))
