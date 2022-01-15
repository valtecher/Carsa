import express from 'express'
import clientController from '../controllers/clientController'
import {registrationSchema} from "../schemas/clientSchemas";
import {validateRequestSchema} from "../middlewares/validateRequestSchema";
import {idParameterSchema} from "../schemas/commonSchemas";
import {authenticateToken} from "../middlewares/token";

const router = express.Router()

router.get('/', clientController.getAllClients)

router.get(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    authenticateToken,
    clientController.getClientById)

router.post(
    '/',
    registrationSchema,
    validateRequestSchema,
    clientController.createClient
)

router.delete(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    clientController.deleteClientById
)

module.exports = router