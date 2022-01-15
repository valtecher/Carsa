import {Request, Response, NextFunction} from 'express'
import {StatusCodes} from 'http-status-codes'
import {JsonWebTokenError} from 'jsonwebtoken'

const jwt = require('jsonwebtoken')

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (!token) res.sendStatus(StatusCodes.UNAUTHORIZED)

    jwt.verify(token, process.env.JWT_SECRET, (err: JsonWebTokenError, user: unknown) => {
        if (err) res.sendStatus(StatusCodes.FORBIDDEN)

        // @ts-ignore TODO: handle suppressing
        req.user = user
        next()
    })
}