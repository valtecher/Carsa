import { param } from 'express-validator';

export const validateGenerationId = [
    param('generationId')
        .trim()
        .isUUID(4).bail().withMessage('Generation id should be a valid UUID v4')
];
