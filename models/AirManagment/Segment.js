const mongoose = require("mongoose");

const segmentSchema = new mongoose.Schema({
  airlineName: String,
  airlineCode: String,
  fromCity: String,
  fromAirportCode: String,
  toCity: String,
  toAirportCode: String,
  stops: String,
  fareType: String,
  checkInBaggage: String,
  cabinBaggage: String,
  totalDuration: String,
  adminId: String,
  airlineNumber: String,
  fareClass: String,
  departTerminal: String,
  arriveTerminal: String,
  departTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Segment", segmentSchema);
