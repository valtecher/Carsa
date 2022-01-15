import {param} from 'express-validator'

export const idParameterSchema = [
    param('id')
        .trim()
        .isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
]
