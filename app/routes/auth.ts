import express from 'express'
import authController from '../controllers/authController'

const router = express.Router()

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/check_status', authController.check_user_status)

module.exports = router