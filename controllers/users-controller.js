import User from "../models/user.js";

import { ctrlWrapper } from "../decorators/index.js";

import { httpError } from "../helpers/index.js";

const getAll = async (req, res) => {
  const result = await User.find({});
  res.json(result);
};

const add = async (req, res) => {
  const result = await User.create(req.body);
  res.status(201).json(result);
};

const getById = async (req, res) => {
  const {id} = req.params;
  const result = await User.findById(id);
  if (!result) {
    throw httpError(404, `User with id=${id} not found`);
  }
  res.json(result);
};

const updateById = async (req, res) => {
  const {id} = req.params
  const result = await User.findByIdAndUpdate(id, req.body, {new: true})
  if (!result) {
    throw httpError(404, `User with id=${id} not found`);
  }
  res.json(result)
}

const deleteById = async (req, res) => {
  const {id} = req.params
  const result = await User.findByIdAndDelete(id)
  if (!result) {
    throw httpError(404, `User with id=${id} not found`);
  }
  res.json({
    message: "Delete success"
  })
}

export default {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
