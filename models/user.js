import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  username: String,
  email: String,
});

const User = model("user", userSchema);

export default User;
