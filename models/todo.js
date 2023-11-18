import { Schema, model } from "mongoose";
import Joi from "joi";

const todoSchema = new Schema({
  title: {
    type: String,
  required: true,
},
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String
  }
}, {versionKey: false, timestamps: true});

export const todoAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `Todo should contain "title"`,
  }),
  completed: Joi.boolean(),
  userId: Joi.string()
});

export const todoUpgradeCompletedSchema = Joi.object({
  completed: Joi.boolean().required()
})

const Todo = model("todo", todoSchema);

export default Todo;
