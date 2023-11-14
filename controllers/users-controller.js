import User from "../models/user.js";

import {ctrlWrapper} from '../decorators/index.js';

// import {httpError} from "../helpers/index.js"

const getAll = async(req, res) => {
  const result = await User.find({})
  console.log(result)
  res.json(result)
}

const add = async (req, res) => {
    const result = await User.create(req.body);
    res.status(201).json(result);
}

export default {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
}