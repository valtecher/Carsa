import {CorsOptions} from 'cors'

const cors = require('cors')

const whitelist = new Set(['http://localhost:3001', 'https://localhost:3001', 'http://localhost:3000'])

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin && whitelist.has(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = cors(corsOptions)