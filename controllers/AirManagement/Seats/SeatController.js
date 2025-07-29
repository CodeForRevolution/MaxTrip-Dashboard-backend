// const  Seat= required() '../../../models/AirManagment/Seats';
const Seat = require("../../../models/AirManagment/Seats");
const DateModel = require("../../../models/AirManagment/Dates");
// Create a new seat
exports.createSeat = async (req, res) => {
  try {

    const seat = await Seat.create(req.body);
    res.status(201).json(seat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateSeat = async (req, res) => {
  try {
    const seatId = req.params.id;
    const updatedData = req.body;

    const updatedSeat = await Seat.findByIdAndUpdate(seatId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSeat) {
      return res.status(404).json({ error: "Seat not found" });
    }

    res.status(200).json({ status: true, data: updatedSeat });
  } catch (err) {
    res.status(400).json({ status: false, error: err.message });
  }
};

// Get all seats
exports.getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.status(200).json(seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get seat by ID
exports.getSeatById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);

    if (!seat) return res.status(404).json({ message: 'Seat not found' });

    const pipeline = [
      {
        $match: { _id: seat.datesId }
      },
      {
        $lookup: {
          from: 'seats',
          localField: '_id',
          foreignField: 'datesId',
          as: 'seats'
        }
      },
      {
        $lookup: {
          from: 'segments',
          localField: 'segmentId',
          foreignField: '_id',
          as: 'segment'
        }
      },
      {
        $unwind: {
          path: '$segment',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'inventories',
          localField: 'inventoryId',
          foreignField: '_id',
          as: 'inventory'
        }
      },
      {
        $unwind: {
          path: '$inventory',
          preserveNullAndEmptyArrays: true
        }
      }
    ];

    const [datesObject] = await DateModel.aggregate(pipeline);
    const {segment,inventory}=datesObject
   delete datesObject.seats;

let finalObject={
    seat:seat,
    segment,
    inventory,
    dates:datesObject
}


    res.status(200).json(finalObject)
     
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// Delete seat by ID
exports.deleteSeat = async (req, res) => {
  try {
    const seat = await Seat.findByIdAndDelete(req.params.id);
    if (!seat) return res.status(404).json({ message: 'Seat not found' });
    res.status(200).json({ message: 'Seat deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
