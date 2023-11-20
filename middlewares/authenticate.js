import jwt from "jsonwebtoken";

import { httpError } from "../helpers/index.js";
import User from "../models/user.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(httpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      return next(httpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(httpError(401, error.message));
  }
};

export default authenticate;
