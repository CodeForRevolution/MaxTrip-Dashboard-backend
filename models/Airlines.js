const mongoose = require("mongoose");

const AirlineSchema = new mongoose.Schema(
  {
    airlinesname: {
      type: String,
      required: true,
      trim: true,
    },
    airlinescode: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Airlines", AirlineSchema);
