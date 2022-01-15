import express from 'express'
import stripeController from '../controllers/stripeController'

const router = express.Router();

router.post('/', stripeController.createStripePayment)


module.exports = router