const User = require("../modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    // Check if user exists with the given email or username
    const checkUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    console.log(checkUser);
    if (checkUser) {
      return res.send({ msg: "Email or username already exists" });
      console.log(res.send({msg}));
    } else {
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      // Save the new user to the database
      const createdUser = await newUser.save();

      // Create a JWT token and send it to the client
      const token = jwt.sign({ id: createdUser._id }, process.env.salt);

      return res.send({ token });
    }
  } catch (err) {
    // Handle any errors that occur during the process
    console.error("Error in signup:", err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

// const signup = async (req, res) => {
//   var checkUser = await User.findOne({
//     email: req.body.email ,username: req.body.username
//   });
//   if (checkUser) {
//     return res.send({ msg: "Email or username already exists" });
//   } else {
//     //adding salt
//     bcrypt.genSalt(10, async (err, salt) => {
//       bcrypt.hash(req.body.password, salt, async (err, hash) => {
//         //hashing salted
//         var user = new User({
//           username: req.body.username,
//           email: req.body.email,
//           password: hash,
//         });
//         var createdUser = await User.create(user);
//         var token = jwt.sign({ id: createdUser._id }, process.env.salt); //sending token to front and
//         return res.send({ token });
//       });
//     });
//   }
// };

const login = async (req, res) => {
  var user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }); //checking if email or username exist
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      //checking crypted password with crypted password from database
      if (result) {
        var token = jwt.sign({ id: user._id }, process.env.salt);
        return res.send({ token });
      } else {
        return res.send({ msg: "Wrong password" });
      }
    });
  } else {
    return res.send({ msg: "Username or email not exist " });
  }
};

const verify = async (req, res) => {
  if (!req.body.token) {
    return res.send({ msg: "Token not provided" });
  }

  try {
    var payload = jwt.verify(req.body.token, process.env.salt);
    if (payload) {
      var user = await User.findOne({ _id: payload.id });
      if (user) {
        var token = jwt.sign({ id: user._id }, process.env.salt);
        return res.send(user);
      } else {
        return res.send({ msg: "User not found" });
      }
    } else {
      return res.send({ msg: "Invalid token" });
    }
  } catch (error) {
    return res.send({ msg: "Invalid token" });
  }
};

module.exports = {
  signup,
  login,
  verify,
};
