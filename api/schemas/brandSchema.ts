import { param } from 'express-validator';

export const validateBrandId = [
    param('brandId')
        .trim()
        .isUUID(4).bail().withMessage('Brand id should be a valid UUID v4')
];
