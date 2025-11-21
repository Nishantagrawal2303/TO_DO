const mongoose = require("mongoose");
require("dotenv").config();

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("db connected ");
  } catch (err) {
    console.log(err, "error connection");
  }
};
module.exports = connectdb;
