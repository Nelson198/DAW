const express = require("express")
const jwt = require("jsonwebtoken")

// Initialize and export the express app
const app = express()
module.exports.app = app

// Configure and export the server
const server = require("http").createServer(app)
module.exports.server = server

// Configure and export the socket
const io = require("socket.io")(server)

io.use((socket, next) => {
    // Check if the authorization header exists
    if (!socket.handshake || !socket.handshake.headers || !socket.handshake.headers.authorization)
        return next(new Error("Access denied. No token provided."))

    // Check if the authorization header is of the form "Bearer jwtToken"
    const parts = socket.handshake.headers.authorization.split(" ")
    if (parts.length !== 2 || parts[0] !== "Bearer")
        return next(new Error("Access denied. Invalid token format."))

    const token = parts[1]
    jwt.verify(token, JWTKEY, (err, decoded) => {
        if (err)
            return next(new Error("Access denied. Invalid token."))

        const userTokens = ValidTokens.get(decoded.username)
        if (!userTokens || !userTokens.has(token))
            return next(new Error("Access denied. Token has been revoked."))

        socket.token = token
        socket.user = decoded
        next()
    })
})

io.on("connect", (socket) => {
    // ...
})

module.exports.io = io
