import { Request, Response, NextFunction } from "express"
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)



const createStripePayment = async (req:Request, res:Response, next:NextFunction) => {
  let {amount, id } = req.body
  console.log(amount, id)
  try{  
      const payment = await stripe.paymentIntents.create({ amount, currency: "USD", description: 'Car Package', payment_method: id, confirm: true })
      res.json({
        message: 'Payment successful',
        success: true,
      })
   } catch(err){
     console.log('Error: ', err);
    res.json({
      message: 'Payment failed',
      success: false,

    })
   }
}

export default {
  createStripePayment
}