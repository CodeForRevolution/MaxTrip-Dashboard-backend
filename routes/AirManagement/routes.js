const router = require("express").Router();
const airPorts = require("../../controllers/AirManagement/Airports/routes");
const airlines = require("../../controllers/AirManagement/Airlines/routes");
const segment = require("../../controllers/AirManagement/segment/routes");
const inventory = require("../../controllers/AirManagement/Inventory/routes");
const dates = require("../../controllers/AirManagement/Dates/routes");
const seat = require("../../controllers/AirManagement/Seats/routes");

router.use("/airport", airPorts);
router.use("/airline", airlines);
router.use("/segment", segment);
router.use("/inventory", inventory);
router.use("/inventory", inventory);
router.use("/dates", dates);
router.use("/seat",seat);

module.exports = router;
