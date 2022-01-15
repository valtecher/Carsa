import express from 'express'
import carController from '../controllers/carController'
import {validateRequestSchema} from '../middlewares/validateRequestSchema'
import {addCarToOrderSchema, addEquipmentToCarSchema, creatingCarSchema} from '../schemas/carSchema'
import {idParameterSchema} from "../schemas/commonSchemas";

const passport = require('passport')
const router = express.Router()

router.get('/', carController.getAllCars);
router.get('/car/:id', carController.getCarById);
router.get('/client', passport.authenticate("jwt", {session: false}), carController.getAllCarsForClient);


// ------------------------- Car naming ----------------------------

router.get('/brands', carController.getCarBrands)
router.get('/models', carController.getModelsForBrandByName)
router.get('/generations', carController.getGenerationsForModel)

// ------------------------ Create car

router.post(
    '/',
    creatingCarSchema,
    validateRequestSchema,
    carController.createCar
)


router.put('/:id', carController.updateCar)
router.delete('/:id', carController.deleteById)

// ---------------------------- CAR EQUIPMENTS ----------------------------
router.get(
    '/:id/equipments',
    idParameterSchema,
    validateRequestSchema,
    carController.getCarEquipments
)

router.post(
    '/:id/equipments',
    idParameterSchema,
    addEquipmentToCarSchema,
    validateRequestSchema,
    carController.addEquipmentToCar
)

router.delete(
    '/:id/equipments',
    idParameterSchema,
    validateRequestSchema,
    carController.deleteCarEquipments
)
// ---------------------------- END CAR EQUIPMENTS ----------------------------

// ---------------------------- CAR ORDER ----------------------------
router.post(
    '/orders',
    addCarToOrderSchema,
    validateRequestSchema,
    carController.addCarToOrder
)

module.exports = router