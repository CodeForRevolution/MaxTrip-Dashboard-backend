const mongoose = require("mongoose");

const AirportSchema = new mongoose.Schema(
  {
    countrycode: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    countryname: {
      type: String,
      required: true,
      trim: true,
    },
    airportcode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    airportname: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Airports", AirportSchema);
