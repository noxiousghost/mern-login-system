const mongoose = require("mongoose");
const { Schema } = mongoose;
const event = new Date();

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  phoneNumber: { type: String, unique: true },
  fullName: String,
  email: { type: String, unique: true, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
