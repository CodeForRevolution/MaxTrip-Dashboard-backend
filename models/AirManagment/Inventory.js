const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    segmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Segment", // Assuming your segment model is named 'Segment'
      required: true,
      trim: true,
    },
    fareValidity: {
      type: String,
      trim: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    fareId: {
      type: String,
      trim: true,
    },
    agencyId: {
      type: String,
      trim: true,
    },
    basePrice: {
      type: String,
      trim: true,
    },
    tax: {
      type: String,
      trim: true,
    },
    totalPrice: {
      type: String,
      trim: true,
    },
    infantPrice: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
    cancellationCharges: {
      type: String,
      trim: true,
    },
    rescheduleCharges: {
      type: String,
      trim: true,
    },
    noOfDays: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", InventorySchema);
