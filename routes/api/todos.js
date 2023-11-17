import express from "express";

import todosController from "../../controllers/todos-controller.js";

import todosSchemas from "../../schemas/todos-schemas.js";

import { validateBody } from "../../decorators/index.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js";

const todosRouter = express.Router();

todosRouter.get("/", todosController.getAll);

todosRouter.post(
  "/",
  isEmptyBody,
  validateBody(todosSchemas.todoAddSchema),
  todosController.add
);

todosRouter.get("/:id", isValidId, todosController.getById)

todosRouter.put("/:id", isValidId, isEmptyBody, validateBody(todosSchemas.todoUpgradeCompletedSchema), todosController.updateById)

// todosRouter.patch("/:id/completed", isValidId, isEmptyBody, validateBody(todosSchemas.todoUpgradeCompletedSchema), todosController.updateCompleted)

todosRouter.delete("/:id", isValidId, todosController.deleteById)

export default todosRouter;
