import { Router } from 'express';
import tableController from '../controllers/table.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';
import * as tableMiddleware from '../middlewares/table.middleware.js';

const tableRouter = Router();
tableRouter.use(authMiddleware.authenticate);
tableRouter.route('/')
    .get(authMiddleware.authorize(['admin', 'staff']), tableController.getAll)
    .post(authMiddleware.authorize(['admin']), tableMiddleware.create, tableController.create)

tableRouter.route('/:id')
    .get(authMiddleware.authorize(['admin', 'staff']), tableController.getOne)
    .put(authMiddleware.authorize(['admin', 'staff']), tableMiddleware.update, tableController.update)
    .delete(authMiddleware.authorize(['admin']), tableController.delete)

export default tableRouter;