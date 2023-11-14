import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  required: true,
},
  username: {
    type: String,
  },
  email: {
    type:String,
    required:true,
    unique: true,
  },
}, {versionKey: false, timestamps: true});

const User = model("user", userSchema);

export default User;
