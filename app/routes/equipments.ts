import express from 'express'
import equipmentController from '../controllers/equipmentController'
import {idParameterSchema} from "../schemas/commonSchemas";
import {validateRequestSchema} from "../middlewares/validateRequestSchema";
import {creatingEquipmentSchema, editingEquipmentSchema} from "../schemas/equipmentSchema";

const router = express.Router()

router.get(
    '/',
    equipmentController.getAllEquipments
)

router.get(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    equipmentController.getEquipmentById
)

router.post(
    '/',
    creatingEquipmentSchema,
    validateRequestSchema,
    equipmentController.addEquipment
)

router.put(
    '/:id',
    idParameterSchema,
    editingEquipmentSchema,
    validateRequestSchema,
    equipmentController.editEquipment
)

router.delete(
    '/:id',
    idParameterSchema,
    validateRequestSchema,
    equipmentController.deleteEquipmentById
)


module.exports = router