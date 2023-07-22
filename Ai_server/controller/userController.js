const User = require("../modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  var checkUser = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (checkUser) {
    return res.status(409).send({ msg: "Email or username already exists" });
  } else {
    //adding salt
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        //hashing salted
        var user = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });
        var createdUser = await User.create(user);
        var token = jwt.sign({ id: createdUser._id }, process.env.salt); //sending token to front and
        return res.status(201).send({ token });
      });
    });
  }
};

const login = async (req, res) => {
  var user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }); //checking if email or username exist
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      //checking crypted password with crypted password from database
      if (result) {
        var token = jwt.sign({ id: user._id }, process.env.salt);
        return res.status(200).send({ token });
      } else {
        return res.status(401).send({ msg: "Wrong password" });
      }
    });
  } else {
    return res.status(404).send({ msg: "Username or email not exist " });
  }
};

const verify = async (req, res) => {
  if (!req.body.token) {
    return res.status(400).send({ msg: "Token not provided" });
  }

  try {
    var payload = jwt.verify(req.body.token, process.env.salt);
    if (payload) {
      var user = await User.findOne({ _id: payload.id });
      if (user) {
        var token = jwt.sign({ id: user._id }, process.env.salt);
        return res.status(200).send(user);
      } else {
        return res.status(404).send({ msg: "User not found" });
      }
    } else {
      return res.status(401).send({ msg: "Invalid token" });
    }
  } catch (error) {
    return res.status(401).send({ msg: "Invalid token" });
  }
};

module.exports = {
  signup,
  login,
  verify,
};
