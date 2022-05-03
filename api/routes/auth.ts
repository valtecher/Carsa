import express from 'express';
import authController from '../controllers/authController';
import { requireAuthentication } from '../middleware/requireAuthentication';
import { useRegistrationSchema, useLoginSchema } from '../schemas/authSchema';
import { validateRequestSchema } from '../middleware/validateRequestSchema';

const router = express.Router();

router.post(
    '/register',
    useRegistrationSchema,
    validateRequestSchema,
    authController.register
);

router.post(
    '/login',
    useLoginSchema,
    validateRequestSchema,
    authController.login
);

router.get(
    '/logout',
    authController.logout
);

router.get(
    '/protected',
    requireAuthentication,
    authController.getProtected
);

export default router;
