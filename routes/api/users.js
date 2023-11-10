const express = require("express");
const Joi = require("joi");

const users = require("../../models/users");

const { createError} = require("../../helpers")

const router = express.Router();

const userAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
})

router.get("/", async(req, res, next) => {
  try {
    const result = await users.getAll();
    res.json(result);
  } catch (error) {
    // res.status(500).json({
    //   message: "Server error",
    // });
    // Помилка обробиться в app.js
    next(error);
  }
});

router.get("/:id", async(req, res, next) => {
  try {
    const { id } = req.params;
    const result = await users.getById(id);
    if (!result) {
      // Це стандартна обробка помилки
      // return res.status(404).json({
      //   message: "Not found",
      // });
      // Так помилка обробиться в catch > next(error) > app.js
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
      // Генеруємо кастомну помилку в createError()
      throw createError(404)
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async(req, res, next) => {
  try {
    const {error} = userAddSchema.validate(req.body)
    if(error) {
      throw createError(400, error.message)
    }
    const result = await users.add(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async(req, res, next) => {
  try {
    const {error} = userAddSchema.validate(req.body)
    if(error) {
      throw createError(400, error.message)
    }
    const {id} = req.params;
    const result = await users.updateById(id, req.body)
    if(!result) {
      throw createError(404)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async(req, res, next) => {
  try {
    const {id} = req.params
    const result = await users.removeById(id);
    if(!result) {
      throw createError(404)
    }
    res.json({
      message: `User ${result.name}  deleted`
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router;
