const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const authRouter = require("./routers/authRouter");
const taskRouter = require("./routers/taskRouter");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("uploads"));

// Passport middleware
app.use(passport.initialize());

const uri = process.env.ATLAS_URI;

const connectDb = async () => {
  try {
    const Db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (Db) {
      console.log("DB Connected!");
    }
  } catch (error) {
    console.log(`DB Connection Error: ${error.message}`);
  }
};
connectDb();
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.listen(port, () => {
  console.log(`Server is runing on port: ${port}`);
});
