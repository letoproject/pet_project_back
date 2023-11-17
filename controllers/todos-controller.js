import Todo from "../models/todo.js";

import { ctrlWrapper } from "../decorators/index.js";

import { httpError } from "../helpers/index.js";

const getAll = async (req, res) => {
  const result = await Todo.find({});
  res.json(result);
};

const add = async (req, res) => {
  const result = await Todo.create(req.body);
  res.status(201).json(result);
};

const getById = async (req, res) => {
  const {id} = req.params;
  const result = await Todo.findById(id);
  if (!result) {
    throw httpError(404, `Todo with id=${id} not found`);
  }
  res.json(result);
};

const updateById = async (req, res) => {
  const {id} = req.params
  const result = await Todo.findByIdAndUpdate(id, req.body, {new: true})
  if (!result) {
    throw httpError(404, `Todo with id=${id} not found`);
  }
  res.json(result)
}

const updateCompleted = async (req, res) => {
  const { id} = req.params;
  const result = await Todo.findByIdAndUpdate(id, req.body, {new: true})
  if (!result) {
    throw httpError(404, `Todo with id=${id} not found`)
  }
  res.json(result)
}

const deleteById = async (req, res) => {
  const {id} = req.params
  const result = await Todo.findByIdAndDelete(id)
  if (!result) {
    throw httpError(404, `Todo with id=${id} not found`);
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
  updateCompleted: ctrlWrapper(updateCompleted),
  deleteById: ctrlWrapper(deleteById),
};
