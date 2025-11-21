const mongoose = require("mongoose");

const doctorschema = new mongoose.Schema({
  name: { type: String, required: true },
  Time: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("doctor", doctorschema);
