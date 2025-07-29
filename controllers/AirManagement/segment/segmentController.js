const Segment = require("../../../models/AirManagment/Segment");

exports.createSegment = async (req, res) => {
  try {
    const segment = new Segment(req.body);
    await segment.save();
    res.status(201).json(segment);
  } catch (error) {
    res.status(500).json({ message: "Error creating segment", error: error.message });
  }
};

exports.getAllSegments = async (req, res) => {
  try {
    const segments = await Segment.find().sort({ createdAt: -1 });
    res.status(200).json({
        status:true,
        data:segments,
        message:""
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching segments", error: error.message });
  }
};

exports.getSegmentById = async (req, res) => {
  try {
    const segment = await Segment.findById(req.params.id);
    if (!segment) {
      return res.status(404).json({ message: "Segment not found" });
    }
    res.status(200).json({
        success:true,
        data:segment,
        message:""

    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching segment", error: error.message });
  }
};

exports.updateSegment = async (req, res) => {
  try {
    const segment = await Segment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!segment) {
      return res.status(404).json({ message: "Segment not found" });
    }
    res.status(200).json({
        success:true,
        data:segment,
        message:""
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating segment", error: error.message });
  }
};

exports.deleteSegment = async (req, res) => {
  try {
    const segment = await Segment.findByIdAndDelete(req.params.id);
    if (!segment) {
      return res.status(404).json({ message: "Segment not found" });
    }
    res.status(200).json({ message: "Segment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting segment", error: error.message });
  }
};
