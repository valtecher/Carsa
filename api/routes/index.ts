import express from 'express';
import authRouter from './auth';

import carBrandsRouter from './brands';
import carModelsRouter from './models';
import carGenerationsRouter from './generations';
import configurationsRouter from './configurations';
import ordersRouter from './orders';
import carsRouter from './cars';
import paymentsRouter from './payments';


// const swaggerUI = require('swagger-ui-express');
// const swaggerDocs = require('../../config/swagger');

const router = express.Router();

// router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// router.use('/api/cars', require('./cars'));
// router.use('/api/clients', require('./clients'));
// router.use('/api/locations', require('./locations'));
// router.use('/api/overviews', require('./overviews'));
// router.use('/api/reports', require('./reports'));
router.use('/api/auth', authRouter);
router.use('/api/brands', carBrandsRouter);
router.use('/api/models', carModelsRouter);
router.use('/api/generations', carGenerationsRouter);
router.use('/api/configurations', configurationsRouter);
router.use('/api/orders', ordersRouter);
router.use('/api/cars', carsRouter);
router.use('/api/payments', paymentsRouter);
// router.use('/api/scraper', require('./scrapper'));
// router.use('/api/equipments', require('./equipments'));
// router.use('/api/stripe', require('./stripePayments'));

export default router;
