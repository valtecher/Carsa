import { Router } from 'express';
import generationsController from '../controllers/generationsController';
import { validateGenerationId } from '../schemas/generationSchema';
import { validateRequestSchema } from '../middleware/validateRequestSchema';

const router = Router();

router.get(
    '/:generationId',
    validateGenerationId,
    validateRequestSchema,
    generationsController.getGenerationById
);

export default router;
