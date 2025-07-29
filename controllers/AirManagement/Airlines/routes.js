const express = require("express");
const router = express.Router();
const airlineController = require("./controller");

router.post("/", airlineController.createAirline);
router.get("/", airlineController.getAllAirlines);
router.get("/:id", airlineController.getAirlineById);
router.put("/:id", airlineController.updateAirline);
router.delete("/:id", airlineController.deleteAirline);

module.exports = router;
