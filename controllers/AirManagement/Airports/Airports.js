const Airport = require("../../../models/Airports");



exports.createAirport = async (req, res) => {
  console.log("your are creating airport")
  try {
    const { countrycode, countryname, airportcode, city, airportname } = req.body;
    const existing = await Airport.findOne({ airportcode: airportcode.toUpperCase() });
    if (existing) {
      return res.status(404).json({
        status:false,
        message: "Airport code already exists" });
    }
    const newAirport = new Airport({ countrycode, countryname, airportcode, city, airportname });
    await newAirport.save();
    res.status(201).json(newAirport);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all airports
exports.getAllAirports = async (req, res) => {
  try {
    const airports = await Airport.find().sort({ createdAt: -1 });


    res.status(200).json({
      status:true,
      data:airports,
      message:""
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get airport by ID
exports.getAirportById = async (req, res) => {
  try {
    const airport = await Airport.findById(req.params.id);
    if (!airport) {
      return res.status(404).json({ message: "Airport not found" });
    }
    res.status(200).json(airport);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update airport
exports.updateAirport = async (req, res) => {
  try {
    const airport = await Airport.findById(req.params.id);
    if (!airport) {
      return res.status(404).json({ message: "Airport not found" });
    }

    const { countrycode, countryname, airportcode, city, airportname } = req.body;

    airport.countrycode = countrycode || airport.countrycode;
    airport.countryname = countryname || airport.countryname;
    airport.airportcode = airportcode || airport.airportcode;
    airport.city = city || airport.city;
    airport.airportname = airportname || airport.airportname;

    await airport.save();

    res.status(200).json(airport);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.deleteAirport = async (req, res) => {
  console.log("your delete")
  try {
    const airport = await Airport.findByIdAndDelete(req.params.id);

    if (!airport) {
      return res.status(404).json({ message: "Airport not found" });
    }

    res.status(200).json({ message: "Airport deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

