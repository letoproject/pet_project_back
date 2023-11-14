import Joi from "joi";

const userAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" must be exist`,
  }),
  username: Joi.string(),
  email: Joi.string().required(),
});

export default {
  userAddSchema,
};
