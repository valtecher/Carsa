import {body} from 'express-validator'
import {isReportTypeName, reportTypes} from '../../types/reportType'

export const addReportSchema = [
    body('overview_id')
        .exists().bail().withMessage('The field is required')
        .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4'),
    body('type')
        .exists().bail().withMessage('The field is required')
        .isString().notEmpty()
        .custom((value) =>
            isReportTypeName(value)).bail().withMessage('Report type should be one of the following: ' + reportTypes.join(', ')),
    body('condition')
        .exists().bail().withMessage('The field is required')
        .isInt({min: 1, max: 100}).bail().withMessage('Field should be a number from 1 to 100'),
    body('details')
        .exists().bail().withMessage('The field is required')
        .trim().isString().notEmpty().isLength({min: 5}).bail().withMessage('Field should contain at least 5 characters')
]

export const editReportSchema = [
    body('id')
        .exists().bail().withMessage('The field is required')
        .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4'),
    body('type')
        .optional()
        .isString().notEmpty()
        .custom((value) =>
            isReportTypeName(value)).bail().withMessage('Field should be one of the following: ' + reportTypes.join(', ')),
    body('condition')
        .optional()
        .isInt({min: 1, max: 100}).bail().withMessage('Field should be a number from 1 to 100'),
    body('details')
        .optional()
        .trim().isString().notEmpty().isLength({min: 5}).bail().withMessage('Field should contain at least 5 characters')
]