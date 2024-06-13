import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.route('/login')
    .post(authMiddleware.login, authController.login);

export default authRouter;
