import path from 'path'

const multer = require('multer')
const uuid = require('uuid')

const storage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, 'uploads')
    },
    filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, uuid.v4() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

module.exports = upload