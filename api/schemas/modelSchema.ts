import { param } from 'express-validator';

export const validateModelId = [
    param('modelId')
        .trim()
        .isUUID(4).bail().withMessage('Model id should be a valid UUID v4')
];
