import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
  required: true,
},
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String
  }
}, {versionKey: false, timestamps: true});

const Todo = model("todo", todoSchema);

export default Todo;
