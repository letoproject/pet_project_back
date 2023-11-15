import { isValidObjectId } from "mongoose";

import { httpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId) {
    return next(httpError(404, `${id} is not valid ID`));
  }
  next();
};

export default isValidId;
