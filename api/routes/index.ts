import express from 'express';
import authRouter from './auth';

import carBrandsRouter from './brands';
import carModelsRouter from './models';
import carGenerationsRouter from './generations';
import configurationsRouter from './configurations';
import ordersRouter from './orders';
import carsRouter from './cars';
import paymentsRouter from './payments';
import reportsRouter from './reports';


// const swaggerUI = require('swagger-ui-express');
// const swaggerDocs = require('../../config/swagger');

const router = express.Router();

router.use('/api/auth', authRouter);
router.use('/api/orders', ordersRouter);

router.use('/api/brands', carBrandsRouter);
router.use('/api/models', carModelsRouter);
router.use('/api/generations', carGenerationsRouter);
router.use('/api/configurations', configurationsRouter);

router.use('/api/cars', carsRouter);
router.use('/api/payments', paymentsRouter);
router.use('/api/reports', reportsRouter)

export default router;
