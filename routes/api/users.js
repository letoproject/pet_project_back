import express from "express";

import usersController from "../../controllers/users-controller.js";

import usersSchema from "../../schemas/users-schema.js";

import { validateBody } from "../../decorators/index.js";

import { isEmptyBody } from "../../middlewares/index.js";

const usersRouter = express.Router();

usersRouter.get("/", usersController.getAll);

usersRouter.post(
  "/",
  isEmptyBody,
  validateBody(usersSchema.userAddSchema),
  usersController.add
);

export default usersRouter;
