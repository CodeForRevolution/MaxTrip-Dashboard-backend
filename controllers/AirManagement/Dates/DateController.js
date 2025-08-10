const DateModel = require("../../../models/AirManagment/Dates");

// Create
exports.createDate = async (req, res) => {
  try {
    const { date, pnr, groupId, noOfSeat, segmentId, inventoryId } = req.body;
    const newDate = new DateModel({
      date,
      pnr,
      groupId,
      noOfSeat,
      segmentId,
      inventoryId,
    });
    await newDate.save();
    res.status(201).json({ status: true, data: newDate });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get All
exports.getAllDates = async (req, res) => {
  try {
    let {
      page = 1,
      pageSize = 9999,
      search = "",
      column = "createdAt",
      direction = 1,
      fromDate = "",
      toDate = "",
    } = req.query;

    const skip = Math.max(0, parseInt(page, 10) - 1) * parseInt(pageSize, 10);

    let dateMatch = {};

    if (fromDate && toDate) {
      dateMatch.date = {
        $gte: new Date(`${fromDate}T00:00:00.000Z`),
        $lte: new Date(`${toDate}T23:59:59.999Z`),
      };
    } else if (fromDate) {
      dateMatch.date = {
        $gte: new Date(`${fromDate}T00:00:00.000Z`),
     
      };
    } else if (toDate) {
      dateMatch.date = {
        $lte: new Date(`${toDate}T23:59:59.999Z`),
      };
    }

    const pipeline = [
      {
        $match: {
          date: {
            // $gte: new Date("2025-08-03T00:00:00.000Z"),
            // $lte: new Date("2025-08-03T23:59:59.999Z"),
           ... dateMatch.date
          },
        },
      },

      {
        $lookup: {
          from: "seats",
          localField: "_id",
          foreignField: "datesId",
          as: "seats",
        },
      },

      {
        $lookup: {
          from: "segments",
          localField: "segmentId",
          foreignField: "_id",
          as: "segment",
        },
      },
      {
        $unwind: {
          path: "$segment",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Lookup inventory object
      {
        $lookup: {
          from: "inventories",
          localField: "inventoryId",
          foreignField: "_id",
          as: "inventory",
        },
      },
      {
        $unwind: {
          path: "$inventory",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $sort: { ["date"]: Number(direction) },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: parseInt(pageSize, 10) }],
        },
      },
    ];

    const result = await DateModel.aggregate(pipeline);

    const totalCount =
      result.length > 0 && result[0].metadata.length > 0
        ? result[0].metadata[0].total
        : 0;

    const data = result.length > 0 && result[0].data ? result[0].data : [];

    return res.status(200).json({
      status: true,
      totalCount,
      data,
    });
  } catch (err) {
    console.error("Error in getAllDatesWithSeats:", err.message);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// Get by ID
exports.getDateById = async (req, res) => {
  try {
    const date = await DateModel.findById(req.params.id);
    if (!date) return res.status(404).json({ message: "Date not found" });
    res.status(200).json(date);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update
exports.updateDate = async (req, res) => {
  try {
    const date = await DateModel.findById(req.params.id);
    if (!date) return res.status(404).json({ message: "Date not found" });

    const {
      date: d,
      pnr,
      groupId,
      noOfSeat,
      segmentId,
      inventoryId,
    } = req.body;

    date.date = d || date.date;
    date.pnr = pnr || date.pnr;
    date.groupId = groupId || date.groupId;
    date.noOfSeat = noOfSeat || date.noOfSeat;
    date.segmentId = segmentId || date.segmentId;
    date.inventoryId = inventoryId || date.inventoryId;

    await date.save();
    res.status(200).json(date);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete
exports.deleteDate = async (req, res) => {
  try {
    const date = await DateModel.findByIdAndDelete(req.params.id);
    if (!date) return res.status(404).json({ message: "Date not found" });

    res.status(200).json({ message: "Date deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
