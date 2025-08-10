const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: true,
    },
    seatNo: {
      type: String,

      trim: true,
    },
    type: {
      type: String,
      enum: ["Adult", "Child", "Infant", ""],
    },
    title: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,

      trim: true,
    },
    lastName: {
      type: String,

      trim: true,
    },
    price: {
      type: String,
    },
    ac: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Confirmed", "Cancelled", "Pending", "Refund"],
      default: "Pending",
    },
    email: {
      type: String,

      trim: true,
    },
    refId: {
      type: String,
    },
    user: {
      type: String, // Or ObjectId if referencing users
      default: "",
    },
    datesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dates",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Seat", seatSchema);
