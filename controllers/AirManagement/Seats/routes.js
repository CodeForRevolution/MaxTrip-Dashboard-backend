const express = require("express");
const router = express.Router();

const seatControler = require("./SeatController");
router.post('/', seatControler.createSeat);
router.get('/', seatControler.getAllSeats);
router.get('/:id', seatControler.getSeatById);
router.put('/:id', seatControler.updateSeat);
router.delete('/:id', seatControler.deleteSeat);

module.exports = router;

