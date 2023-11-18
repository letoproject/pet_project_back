import express from "express";
import todosController from "../../controllers/todos-controller.js";
import { todoAddSchema, todoUpgradeCompletedSchema } from "../../models/todo.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";

const todosRouter = express.Router();

todosRouter.get("/", todosController.getAll);

todosRouter.post(
  "/",
  isEmptyBody,
  validateBody(todoAddSchema),
  todosController.add
);

todosRouter.get("/:id", isValidId, todosController.getById)

todosRouter.put("/:id", isValidId, isEmptyBody, validateBody(todoUpgradeCompletedSchema), todosController.updateById)

// todosRouter.patch("/:id/completed", isValidId, isEmptyBody, validateBody(todoUpgradeCompletedSchema), todosController.updateCompleted)

todosRouter.delete("/:id", isValidId, todosController.deleteById)

export default todosRouter;
