const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
require('dotenv').config();
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../../config/db.js')[env]
const db: any = {}

let sequelize: any

if(process.env.NODE_ENV === 'production'){
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      });
} else {
    sequelize = new Sequelize({
        "username": "postgres",
        "password": "postgres",
        "database": "postgres",
        "host": "127.0.0.1",
        "dialect": "postgres"
    })
}


fs.readdirSync(__dirname)
    .filter((file: string) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts')
    })
    .forEach((file: string) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db;
