const User = require("../modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Img = require("../modules/img");

const getAllUserImg = async (req, res) => {
  try {
    const imgs = await User.find({ imgUrl: req.params.imgUrl });
    res.status(200).json(imgs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.msg });
  }
};

const getUserAvatar = async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log(userId);
    // console.log(payload);
    const avatar = User.find();
  } catch (error) {}
};

const update = async (req, res) => {
  // console.log("user controller update", req.body);
  try {
    await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send({ msg: "updated" });
  } catch (err) {
    console.log(err);
  }
};

const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }, // Use $set to update only the provided fields
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating profile:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const signup = async (req, res) => {
  try {
    // Check if user exists with the given email or username
    const checkUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (checkUser) {
      return res.send({ msg: "Email or username already exists" });
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
    return res.send({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    var user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    }); //checking at least one of email or username exist

    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        //checking crypted password with crypted password from database
        if (err) {
          throw err; // If there is an error in bcrypt, throw it
        }
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
  } catch (error) {
    return res.send({ msg: "Internal server error" });
  }
};

const verify = async (req, res) => {
  if (!req.body.token) {
    return res.send({ msg: "Token not provided" });
  }
  try {
    const payload = jwt.verify(req.body.token, process.env.salt);
    if (payload) {
      const user = await User.findOne({ _id: payload.id });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.salt);
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
//ADD IMG TO FAVORITE
const addFavoriteImg = async (req, res) => {
  const userId = req.body.userId;
  // console.log("user control userId", userId);
  const id = req.body._id;
  try {
    let img = await Img.findById(id);
    console.log("mem o imeg", img);
    let user = await User.findOne({ _id: userId });
    // console.log("usercontrol user", user);
    if (!user.favoriteImg) {
      user.favoriteImg = [img];
      user.save();
    } else {
      user.favoriteImg = [...user.favoriteImg, img];
      user.save();
    }
    return res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed " });
  }
};
//DELETE IMG FROM FAVORITE
const removeFavoriteImg = async (req, res) => {
  const token = req.body.token;
  const id = req.params.id;
  try {
    let payload = jwt.verify(token, "secret");
    let Img = await Img.findById(id);
    let user = await User.findOne({ username: payload.username });

    if (user.favoriteImg.length > 0) {
      for (let i = 0; i < user.favoriteImg.length; i++) {
        // console.log(user.favoriteImg[i]._id.toHexString());
        // console.log(id);
        if (id === user.favoriteImg[i]._id.toHexString()) {
          user.favoriteImg.splice(i, 1);
          user.save();
          return res.json({ user });
        }
      }
    } else {
      return res.json({ message: "Failed to find book" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  signup,
  login,
  verify,
  update,
  getAllUserImg,
  updateProfile,
  getUserAvatar,
  removeFavoriteImg,
  addFavoriteImg,
};
