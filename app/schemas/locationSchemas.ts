import {body, query} from 'express-validator'

export const locationQuerySchema = [
    query('postal_code')
        .optional()
        .trim()
        .isString().notEmpty().bail().withMessage('Parameter must contain a valid non empty string')
        .isPostalCode('any').bail().withMessage('Parameter is not a valid postal code')
]

export const createLocationSchema = [
    body('country')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
    body('state')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
    body('city')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
    body('postal_code')
        .optional()
        .trim()
        .isString().notEmpty().bail().withMessage('Parameter must contain a valid non empty string')
        .isPostalCode('any').bail().withMessage('Parameter is not a valid postal code'),
    body('street')
        .optional()
        .trim()
        .isString().notEmpty().bail().withMessage('Parameter must contain a valid non empty string'),
    body('house_number')
        .optional()
        .trim()
        .isString().notEmpty().bail().withMessage('Parameter must contain a valid non empty string'),
    body('apartment_number')
        .optional()
        .trim()
        .isString().notEmpty().bail().withMessage('Parameter must contain a valid non empty string')
]