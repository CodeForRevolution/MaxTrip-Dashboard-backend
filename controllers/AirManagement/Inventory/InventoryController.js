const Inventory = require("../../../models/AirManagment/Inventory");
const Dates = require("../../../models/AirManagment/Dates");
const Seat = require("../../../models/AirManagment/Seats");

exports.createInventory = async (req, res) => {
  try {
    const newInventory = new Inventory(req.body);
    await newInventory.save();

    const dates = req.body.dates;

    for (const data of dates) {
      const newDate = new Dates({
        date: new Date(data.date),
        pnr: data.pnr,
        groupId: data.groupId,
        noOfSeat: data.noOfSeat,
        segmentId: newInventory.segmentId,
        inventoryId: newInventory._id,
      });

      await newDate.save();

      for (let i = 0; i < Number(newDate.noOfSeat); i++) {
        const seat = new Seat({
          index: i,
          seatNo: "",
          type: "",
          title: "",
          firstName: "",
          lastName: "",
          price: "0",
          ac: "",
          email: "",
          refId: "",
          user: "",
          datesId: newDate._id,
        });

        await seat.save();
      }
    }

    res.status(201).json({ status: true, data: newInventory });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Server error",
      error: err.message,
    });
  }
};
// Get All Inventories
exports.getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: inventories });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "Server error", error: err.message });
  }
};

// Get Inventory by ID
exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory)
      return res.status(404).json({ message: "Inventory not found" });
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Inventory
exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory)
      return res.status(404).json({ message: "Inventory not found" });

    Object.assign(inventory, req.body);
    await inventory.save();

    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete Inventory
exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory)
      return res.status(404).json({ message: "Inventory not found" });

    res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
