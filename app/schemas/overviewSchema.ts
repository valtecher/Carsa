import {body} from 'express-validator'

export const addOverviewSchema = [
    body('car_id')
        .exists().bail().withMessage('The field is required')
        .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4'),
    body('technician_id')
        .exists().bail().withMessage('The field is required')
        .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4'),
    body('date')
        .optional()
        .isISO8601().toDate().bail().withMessage('Field should be a valid datetime e.g. 2021-12-01 18:25:49.738000+02:00')
]