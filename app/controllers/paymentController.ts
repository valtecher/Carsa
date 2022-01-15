const paymentRepository = require('../repositories/paymentRepository')
import {Request, Response, NextFunction} from 'express'
import {StatusCodes} from 'http-status-codes';

const jwt = require('jsonwebtoken')

const getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
    const payments = await paymentRepository.getAllPayemnts()
    const paymentsByOrderIdTest = await paymentRepository.getAllPaymentsByOrderId('13a022e7-3b39-4376-b0be-5ea9fe1c3ec2')
    console.log(payments)
    res.json({payments})
}

const getAllClientPayments = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    console.log(token)
    const decoded = await jwt.decode(token?.split(' ')?.[1])
    const clientPayments = await paymentRepository.getAllClientPayments(decoded.id)
    res.json({clientPayments})
}

const createPayment = async (req:Request, res:Response, next: NextFunction) => {
    const paymentBody = req.body;
    const createdPayment = await paymentRepository.createPayment(paymentBody);
    res.json({ success: true })
}

export default {
    getAllPayments,
    getAllClientPayments,
}