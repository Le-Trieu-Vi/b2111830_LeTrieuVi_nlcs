import { Router } from 'express';
import orderController from '../controllers/order.controller.js';
import * as orderMiddleware from '../middlewares/order.middleware.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const orderRouter = Router();
orderRouter.use(authMiddleware.authenticate);
orderRouter.route('/')
    .get(authMiddleware.authorize(['admin', 'staff']), orderController.getAll)
    .post(authMiddleware.authorize(['admin', 'staff']), orderMiddleware.create, orderController.create);

export default orderRouter;
