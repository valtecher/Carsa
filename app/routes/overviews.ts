import express from 'express'
import overviewController from '../controllers/overviewController'
import {idParameterSchema} from "../schemas/commonSchemas";
import {validateRequestSchema} from "../middlewares/validateRequestSchema";
import {addOverviewSchema} from "../schemas/overviewSchema";

const router = express.Router()

router.get(
    '/',
    overviewController.getAllOverviews
)

router.get(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    overviewController.getOverviewById
)

router.get('/bycar/:carId', overviewController.getOverviewByCarId)

router.post(
    '/',
    addOverviewSchema,
    validateRequestSchema,
    overviewController.addOverview
)

router.delete(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    overviewController.deleteOverviewById
)

module.exports = router