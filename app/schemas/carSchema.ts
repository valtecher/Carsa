import {body} from 'express-validator'

export const creatingCarSchema = [
    body('color')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
        .isLength({min: 2}).bail().withMessage('Field must be minimum 2 chars long'),
    body('vin')
        .optional()
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
        .isLength({min: 17, max: 17}).bail().withMessage('Field must be 17 chars long'),
    body('registrationNumber')
        .optional()
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
    body('description')
        .optional()
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
    body('mileage')
        .exists().bail().withMessage('The field is required')
        .isInt({min: 0, max: 2_000_000}).bail().withMessage('Field should be an integer from 0 to 2,000,000'),
    body('year')
        .exists().bail().withMessage('The field is required')
        .isInt({min: 1920, max: 2022}).bail().withMessage('Field should be an integer from 1920 to 2022'),
    body('drive')
        .exists().bail().withMessage('The field is required')
        .custom(value => ['FWD', 'RWD', 'AWD', '4WD'].includes(value))
        .bail().withMessage('Field should be one of the following: ' + ['FWD', 'RWD', 'AWD', '4WD'].join(', ')),
    body('transmission')
        .exists().bail().withMessage('The field is required')
        .custom(value => ['Manual', 'Automatic', 'CVT', 'DCT'].includes(value))
        .bail().withMessage('Field should be one of the following: ' + ['Manual', 'Automatic', 'CVT', 'DCT'].join(', ')),
    body('market_name')
        .optional(),
    body('marketplace_link')
        .optional(),
    body('price')
        .exists().bail().withMessage('The field is required')
        .isFloat({min: 1}).bail().withMessage('Field should be a non negative float'),
    body('type')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
    body('brand_id')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isUUID(4).bail().withMessage('Parameter should be a valid UUID v4'),
    body('model_id')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isUUID(4).bail().withMessage('Parameter should be a valid UUID v4'),
    body('generation_id')
        .optional()
        .trim()
        .isUUID(4).bail().withMessage('Parameter should be a valid UUID v4'),
    body('engine_id')
        .optional()
        .trim()
        .isUUID(4).bail().withMessage('Parameter should be a valid UUID v4'),
    body('location_id')
        .optional()
        .trim()
        .isUUID(4).bail().withMessage('Parameter should be a valid UUID v4'),
    body('mainImage')
        .optional(),
    body('images')
        .optional()
]

export const addEquipmentToCarSchema = [
    // body('equipments')
    //     .exists().bail().withMessage('The field is required')
    //     .trim()
    //     .isUUID(4).bail().withMessage('Parameter should be a valid UUID v4'),
]

export const addCarToOrderSchema = [
    body('car_id')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isUUID(4).bail().withMessage('Parameter should be a valid UUID v4'),
    body('order_id')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isUUID(4).bail().withMessage('Parameter should be a valid UUID v4'),
]