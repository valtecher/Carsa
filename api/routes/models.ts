import { Router } from 'express';
import modelsController from '../controllers/modelsController';
import { validateModelId } from '../schemas/modelSchema';
import { validateRequestSchema } from '../middleware/validateRequestSchema';

const router = Router();

router.get(
    '/:modelId',
    validateModelId,
    validateRequestSchema,
    modelsController.getModelById
);

router.get(
    '/:modelId/generations',
    validateModelId,
    validateRequestSchema,
    modelsController.getModelGenerations
);

export default router;
