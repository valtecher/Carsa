import { Router } from 'express';
import brandsController from '../controllers/brandsController';
import { validateBrandId } from '../schemas/brandSchema';
import { validateRequestSchema } from '../middleware/validateRequestSchema';

const router = Router();

router.get(
    '/list',
    brandsController.getAllBrands
);

router.get(
    '/:brandId',
    validateBrandId,
    validateRequestSchema,
    brandsController.getBrandById
);

router.get(
    '/:brandId/models',
    validateBrandId,
    validateRequestSchema,
    brandsController.getBrandModels
);

export default router;
