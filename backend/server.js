const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log(`DB Connection Successfull`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});

// "server": "json-server --port 3001 --watch db.json --host 127.0.0.1",
