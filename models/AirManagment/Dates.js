const mongoose = require("mongoose");

const DateSchema = new mongoose.Schema(
  {
    date: {
       type: Date,
      required: true,
   
    },
    pnr: {
      type: String,
      required: true,
      trim: true,
    },
    groupId: {
      type: String,
      required: true,
      trim: true,
    },
    noOfSeat: {
      type:Number,
      required: true,
      trim: true,
    },
    segmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Segment", // Replace with actual Segment model name
      required: true,
    },
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory", // Replace with actual Inventory model name
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dates", DateSchema);
