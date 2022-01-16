require('dotenv').config()

const dev = {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD, 
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    dialect: 'postgres'
}
const prod = {
    connectionString: process.env.DATABASE_URL
}


module.exports = {
    "development": dev,
    "production": prod
}
