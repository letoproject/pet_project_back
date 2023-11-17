import Joi from "joi";

const todoAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `Todo should contain "title"`,
  }),
  completed: Joi.boolean(),
  userId: Joi.string()
});

const todoUpgradeCompletedSchema = Joi.object({
  completed: Joi.boolean().required()
})

export default {
  todoAddSchema,
  todoUpgradeCompletedSchema
};
