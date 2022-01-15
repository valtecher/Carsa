import express from 'express'
import db from './database/models'
require('dotenv').config()

const PORT = process.env.PORT
const corsMiddleware = require('./app/middlewares/cors')
const router = require('./app/routes')
const passport = require("./app/auth/passport")
const app = express()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("./client/build"))
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.disable('x-powered-by')
app.use(passport.initialize())

// Setup CORS Logic
app.options('*', corsMiddleware)
app.use(corsMiddleware)

// Setup session middleware with Redis storage
// app.use(sessionMiddleware)


// Connecting routes
app.use(router)


app.get("*", (req:any, res:any)=>{
    res.sendFile('./client/build/index.html')
})

db.sequelize.sync().then(() => {
    app.listen(PORT || 3000, () => {
        console.log('Server is listening on port', process.env.PORT || 3000)
    })
})
