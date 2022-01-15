import express from 'express'
import reportController from '../controllers/reportController'
import {idParameterSchema} from "../schemas/commonSchemas";
import {addReportSchema, editReportSchema} from "../schemas/reportSchemas";
import {validateRequestSchema} from "../middlewares/validateRequestSchema";

const router = express.Router()

router.get(
    '/',
    reportController.getAllReports
)

router.get('/car/:id', reportController.getAllReportsForCar)

router.get(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    reportController.getOverviewById
)

router.get('/overview/:id', reportController.getAllReportsForOverview)

router.post(
    '/',
    // addReportSchema,
    // validateRequestSchema,
    reportController.addReport
)

router.put(
    '/',
    editReportSchema,
    validateRequestSchema,
    reportController.updateReport
)

router.delete(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    reportController.deleteReportById
)

module.exports = router