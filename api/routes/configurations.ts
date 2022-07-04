import { Router } from 'express';
import configurationsController from '../controllers/configurationsController';
import {
  validateConfigurationId,
  validateCreateConfiguration,
  validateUpdateConfiguration
} from '../schemas/configurationSchema';
import { validateRequestSchema } from '../middleware/validateRequestSchema';

const router = Router();

router.get('/list', configurationsController.getAllConfigurations);

router.get(
  '/:configurationId',
  validateConfigurationId,
  validateRequestSchema,
  configurationsController.getConfigurationById
);

router.post('/', validateCreateConfiguration, validateRequestSchema, configurationsController.createConfiguration);

router.put(
  '/:configurationId',
  validateConfigurationId,
  validateUpdateConfiguration,
  validateRequestSchema,
  configurationsController.updateConfigurationById
);

router.delete(
  '/:configurationId',
  validateConfigurationId,
  validateRequestSchema,
  configurationsController.deleteConfigurationById
);

export default router;
