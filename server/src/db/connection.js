const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    const isConnected = await mongoose.connect(process.env.DB_URI);
    if (isConnected) {
      console.log(
        `Connected to ${process.env.DB_URI.split("/").pop() || "test"} database`
      );
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = connection;
