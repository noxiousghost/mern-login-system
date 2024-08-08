const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const registerNewUser = async (req, res) => {
  try {
    const existinguser = await User.findOne({ email: req.body.email });
    if (existinguser) {
      return res.status(403).json({
        msg: "User Already Exist",
      });
    }

    const bcryptpassword = await bcrypt.hash(
      req.body.password,
      process.env.SALT_ROUNDS
    );
    req.body.password = bcryptpassword;
    await User.create(req.body);
    res.json({
      msg: "Registered Succesfully",
    });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const userDetails = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!userDetails) {
      return res.status(403).json({
        msg: "Email or Password Incorrect",
      });
    }
    const match = await bcrypt.compare(req.body.password, userDetails.password);
    if (!match) {
      return res.status(403).json({
        msg: "Email or Password Incorrect",
      });
    }

    //adding jwt token when user found
    const token = jwt.sign({ email: req.body.email }, "secrectkey");
    res.json({
      msg: "Login Successful",
      token,
      userDetails,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
module.exports = { registerNewUser, loginUser };
