const mongoose = require("mongoose");
const express = require("express");
const Task = require("../modals/task.modal");
const User = require("../modals/user.model");
const jwt = require("jsonwebtoken");

const taskRouter = express.Router();

const SecretOrKey = process.env.SecretOrKey;

const validateTaskInput = require("../validation/task");

taskRouter.use((req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, SecretOrKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
});

taskRouter.route("/").get(async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json(error);
  }
});

taskRouter.route("/").post(async (req, res) => {
  const { errors, isValid } = validateTaskInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let user;
  try {
    user = await User.findById({ _id: req.body.user });
  } catch (error) {
    return res.status(400).json(error);
  }
  if (user) {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      isCompleted: req.body.isCompleted,
      user: req.body.user,
    });
    try {
      await newTask.save();
      return res.status(200).json(newTask);
    } catch (err) {
      return res.status(400).json(err);
    }
  } else {
    return res.status(400).send("No user found with this Id");
  }
});

taskRouter.route("/:id").get( async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json(error);
  }
});

taskRouter.route('/:id').delete(async (req,res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).json(error);
  }
});

taskRouter.route('/:id').post(async (req,res) => {
  const { errors, isValid } = validateTaskInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try{
    await Task.findByIdAndUpdate(req.params.id, {...req.body})
    return res.status(200).json("Task Updated");
  } catch(error){
    return res.status(400).json(error);
  }
  
});

module.exports = taskRouter;
