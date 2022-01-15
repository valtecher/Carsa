import express from 'express'
import configurationController from '../controllers/configurationController'
import {idParameterSchema} from '../schemas/commonSchemas'
import {validateRequestSchema} from '../middlewares/validateRequestSchema'

const router = express.Router()

router.get(
    '/',
    configurationController.getAllConfigurations
)

router.get(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    configurationController.getConfigurationById
)

router.post(
    '/',
    configurationController.addConfiguration
)

router.put(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    configurationController.editConfigurationById
)

router.delete(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    configurationController.deleteConfigurationById
)

module.exports = router