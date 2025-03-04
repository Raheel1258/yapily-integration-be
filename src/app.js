import express from "express";
import routes from "./routes/routes.js";
import mongoose from "mongoose";
import config from "./config/config.js";
import bodyParser from "body-parser";

const mongoString = config.databaseUrl;
mongoose
  .connect(mongoString)
  .then(() => console.log("Database successfully connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use((err, req, res, next) => {
  if (err && err.errorCode) {
    res.status(err.errorCode).json({ error: err.message });
  } else if (err) {
    res.status(500).json(err.message);
  }
});

const port = config.port || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
