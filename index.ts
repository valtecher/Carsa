import express from 'express'
import db from './database/models'
import {spawn} from "child_process";

/*import cluster from 'cluster'
import {cpus} from 'os'

const numCPUs = cpus().length

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`)

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. New worker has been started`)
    })
} else {
    console.log(`Worker ${process.pid} started`)
}*/

require('dotenv').config()

// const sessionMiddleware = require('./app/middlewares/session')
const corsMiddleware = require('./app/middlewares/cors')
const router = require('./app/routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.disable('x-powered-by')


const passport = require("./app/auth/passport")

app.use(passport.initialize())

// Setup CORS Logic
app.options('*', corsMiddleware)
app.use(corsMiddleware)

// Setup session middleware with Redis storage
// app.use(sessionMiddleware)

// Testing image uploading
const upload = require('./app/middlewares/multer')

app.post('/upload', upload.array('images'), (req, res, next) => {
    return res.sendStatus(200)
})

// Connecting routes
app.use(router)


db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('Server is listening on port', process.env.PORT || 3000)
    })
})
