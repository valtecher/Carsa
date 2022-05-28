import express from 'express';
import authRouter from './auth';

import carBrandsController from './brands';
import carModelsController from './models';
import carGenerationsController from './generations';

// const swaggerUI = require('swagger-ui-express');
// const swaggerDocs = require('../../config/swagger');

const router = express.Router();

// router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// router.use('/api/cars', require('./cars'));
// router.use('/api/orders', require('./orders'));
// router.use('/api/clients', require('./clients'));
// router.use('/api/locations', require('./locations'));
// router.use('/api/overviews', require('./overviews'));
// router.use('/api/reports', require('./reports'));
router.use('/api/auth', authRouter);
router.use('/api/brands', carBrandsController);
router.use('/api/models', carModelsController);
router.use('/api/generations', carGenerationsController);
// router.use('/api/payments', require('./payments'));
// router.use('/api/configurations', require('./configurations'));
// router.use('/api/scraper', require('./scrapper'));
// router.use('/api/equipments', require('./equipments'));
// router.use('/api/stripe', require('./stripePayments'));

export default router;
