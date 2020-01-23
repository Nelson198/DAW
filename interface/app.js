const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

/* Módulos de suporte à autenticação */
const uuid = require("uuid/v4")
const session = require("express-session")
const FileStore = require("session-file-store")(session)

const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const axios = require("axios")
const flash = require("connect-flash")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

let indexRouter = require("./routes/index")

/* Configuração da estratégia local */
passport.use(new LocalStrategy(
    { usernameField: "email" }, (email, password, done) => {
        let token = jwt.sign({}, "tpDAW1920", {
            expiresIn: 3000
        })
        axios.get(`http://localhost:5003/api/utilizadores/${email}?token=${token}`)
            .then(dados => {
                const user = dados.data
                if (!user) {
                    return done(null, false, { message: "Utilizador inexistente!\n" })
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: "Password inválida!\n" })
                }

                return done(null, user)
            })
            .catch(erro => done(erro))
    }))

/* Indica-se ao passport como serializar o utilizador */
passport.serializeUser((user, done) => {
    done(null, user.email)
})

/* Desserialização: a partir do id obtem-se a informação do utilizador */
passport.deserializeUser((email, done) => {
    let token = jwt.sign({}, "tpDAW1920", {
        expiresIn: 3000
    })

    axios.get(`http://localhost:5003/api/utilizadores/${email}?token=${token}`)
        .then(dados => done(null, dados.data))
        .catch(erro => done(erro))
})

let app = express()

/* View engine setup */
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

/* Pretty JSON setup */
app.set("json spaces", 4)

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use(session({
    genid: req => {
        return uuid()
    },
    store: new FileStore,
    secret: "pri2019",
    resave: false,
    saveUninitialized: false
}))

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use("/", indexRouter)

/* Catch 404 and forward to error handler */
app.use((req, res, next) => {
    next(createError(404))
})

/* Error handler */
app.use((err, req, res, next) => {
    /* Set locals, only providing error in development */
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    /* Render the error page */
    res.status(err.status || 500)
    res.render("error")
})

module.exports = app