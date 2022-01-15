import express from 'express'
import locationsController from '../controllers/locationController'
import {idParameterSchema} from '../schemas/commonSchemas'
import {validateRequestSchema} from '../middlewares/validateRequestSchema'
import {createLocationSchema, locationQuerySchema} from '../schemas/locationSchemas'

const router = express.Router()

router.get(
    '/',
    locationQuerySchema,
    validateRequestSchema,
    locationsController.getAllLocations)

router.get(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    locationsController.getLocationById
)

router.post(
    '/',
    createLocationSchema,
    validateRequestSchema,
    locationsController.addLocation
)

router.delete(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    locationsController.deleteLocationById
)

module.exports = router