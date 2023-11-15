import express from "express";

import usersController from "../../controllers/users-controller.js";

import usersSchema from "../../schemas/users-schema.js";

import { validateBody } from "../../decorators/index.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js";

const usersRouter = express.Router();

usersRouter.get("/", usersController.getAll);

usersRouter.post(
  "/",
  isEmptyBody,
  validateBody(usersSchema.userAddSchema),
  usersController.add
);

usersRouter.get("/:id", isValidId, usersController.getById)

usersRouter.put("/:id", isValidId, isEmptyBody, validateBody(usersSchema.userAddSchema), usersController.updateById)

usersRouter.delete("/:id", isValidId, usersController.deleteById)

export default usersRouter;
