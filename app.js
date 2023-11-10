const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");

const DB_HOST =
  "mongodb+srv://dmitr:2256161Leto@users.rro2nrv.mongodb.net/petProject?retryWrites=true&w=majority";
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect"))
  .catch(e => console.log(e));

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
