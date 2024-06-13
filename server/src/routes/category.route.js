import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as categoryMiddleware from "../middlewares/category.middleware.js";

const categoryRouter = Router();
categoryRouter.use(authMiddleware.authenticate);
categoryRouter.route("/")
    .get(authMiddleware.authorize(["admin", "staff"]), categoryController.getAll)
    .post(authMiddleware.authorize(["admin"]), categoryMiddleware.create, categoryController.create)

categoryRouter.route("/:id")
    .get(authMiddleware.authorize(["admin", "staff"]), categoryController.getOne)
    .put(authMiddleware.authorize(["admin"]), categoryMiddleware.update, categoryController.update)
    .delete(authMiddleware.authorize(["admin"]), categoryController.delete)

export default categoryRouter;