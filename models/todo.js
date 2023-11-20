import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, validateAtUpdate } from "./hooks.js";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

todoSchema.post("save", handleSaveError);
todoSchema.pre("findOneAndUpdate", validateAtUpdate);
todoSchema.post("findOneAndUpdate", handleSaveError);

export const todoAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `Todo should contain "title"`,
  }),
  completed: Joi.boolean(),
});

export const todoUpgradeCompletedSchema = Joi.object({
  completed: Joi.boolean().required(),
});

const Todo = model("todo", todoSchema);

export default Todo;
