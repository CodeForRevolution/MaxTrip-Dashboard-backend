const Airline = require("../../../models/Airlines");

// Create airline
exports.createAirline = async (req, res) => {
  try {
    const { airlinesname, airlinescode, logo } = req.body;

    const existing = await Airline.findOne({ airlinescode: airlinescode.toLowerCase() });
    if (existing) {
      return res.status(400).json({ status: false, message: "Airline code already exists" });
    }

    const newAirline = new Airline({ airlinesname, airlinescode, logo });
    await newAirline.save();

    res.status(201).json({ status: true, data: newAirline });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all airlines
exports.getAllAirlines = async (req, res) => {
  try {
    const airlines = await Airline.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: airlines });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get airline by ID
exports.getAirlineById = async (req, res) => {
  try {
    const airline = await Airline.findById(req.params.id);
    if (!airline) return res.status(404).json({ message: "Airline not found" });
    res.status(200).json(airline);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update airline
exports.updateAirline = async (req, res) => {
  try {
    const airline = await Airline.findById(req.params.id);
    if (!airline) return res.status(404).json({ message: "Airline not found" });

    const { airlinesname, airlinescode, logo } = req.body;

    airline.airlinesname = airlinesname || airline.airlinesname;
    airline.airlinescode = airlinescode || airline.airlinescode;
    airline.logo = logo || airline.logo;

    await airline.save();
    res.status(200).json(airline);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete airline
exports.deleteAirline = async (req, res) => {
  try {
    const airline = await Airline.findByIdAndDelete(req.params.id);
    if (!airline) return res.status(404).json({ message: "Airline not found" });

    res.status(200).json({ message: "Airline deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
