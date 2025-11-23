import { authenticateUser } from '@/middlewares/auth.middleware.js';
import userController from '@/modules/user/user.controller.js';
import { Router } from 'express';

const router = Router();

router.use(authenticateUser);

// add user authenticated routes here

router.post('/contact-form', userController.contactForm);

export default router;
