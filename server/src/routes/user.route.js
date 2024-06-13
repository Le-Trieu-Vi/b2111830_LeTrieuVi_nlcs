import { Router } from 'express';
import userController from '../controllers/user.controller.js'
import * as userMiddleware from '../middlewares/user.middleware.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const userRouter = Router();
userRouter.use(authMiddleware.authenticate);
userRouter.route('/')
       .post(authMiddleware.authorize(['admin']) ,userMiddleware.create, userController.create)
       .get(authMiddleware.authorize(['admin']), userController.getAll)

userRouter.route('/:id')
       .get(authMiddleware.authorize(['admin']), userController.getOne)
       .put(authMiddleware.authorize(['admin']), userMiddleware.update, userController.update)
       .delete(authMiddleware.authorize(['admin']), userController.delete)

export default userRouter;


