import express from 'express'
import orderController from '../controllers/orderController'
import {validateRequestSchema} from '../middlewares/validateRequestSchema'
import {idParameterSchema} from "../schemas/commonSchemas";

const passport = require('passport')
const router = express.Router()

router.get(
    '/',
    orderController.getAllOrders
)

router.get(
    '/detailed',
    orderController.getAllDetailedOrders
)

router.get(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    orderController.getOrderById
)

router.post(
    '/',
    orderController.addOrder
)

router.put(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    orderController.editOrderById
)

router.delete(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    orderController.deleteOrderById
)

// router.get(
//     '/detailed/:clientId',
//     passport.authenticate("jwt", {session: false}),
//     (req, res) => {
//         res.json('Hello ')
//     }
// )


module.exports = router