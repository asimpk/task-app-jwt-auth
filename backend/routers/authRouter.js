const express = require("express");
const User = require("../modals/user.model");
const debug = require("debug")("app:authRouter");
const { MongoClient, ObjectID } = require("mongodb");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

const SecretOrKay = process.env.SecretOrKey;

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

authRouter.route("/register").post(async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let user;
  try {
    user = await User.findOne({ email: req.body.email });
  } catch (error) {
    return res.status(400).json(error);
  }
  if (user) {
    return res.status(400).send("User already registered");
  } else {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        try {
          await newUser.save();
          return res.status(200).json(newUser);
        } catch (err) {
          return res.status(400).json(err);
        }
      });
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return res.status(404).json(error);
  }
  if (!user) {
    errors.email = "User not found";
    return res.status(404).json(errors);
  } else {
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(payload, SecretOrKay, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: token,
          });
        });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  }
});

module.exports = authRouter;
