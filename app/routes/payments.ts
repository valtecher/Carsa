import express from 'express'
import paymentController from "../controllers/paymentController"

const passport = require('passport')
const router = express.Router()


router.get('/', passport.authenticate("jwt", {session: false}), paymentController.getAllPayments)

router.get('/clientpayments', passport.authenticate("jwt", {session: false}), paymentController.getAllClientPayments)
router.get('/:id', passport.authenticate("jwt", {session: false}))
router.post('/', passport.authenticate("jwt", {session: false}))
router.put('/:id', passport.authenticate("jwt", {session: false}))
router.delete('/:id', passport.authenticate("jwt", {session: false}))


module.exports = router