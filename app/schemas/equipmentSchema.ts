import {body} from 'express-validator'

export const creatingEquipmentSchema = [
    body('name')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
        .isLength({min: 2}).bail().withMessage('Field must be minimum 2 chars long')
]

export const editingEquipmentSchema = [
    body('name')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
        .isLength({min: 2}).bail().withMessage('Field must be minimum 2 chars long')
]