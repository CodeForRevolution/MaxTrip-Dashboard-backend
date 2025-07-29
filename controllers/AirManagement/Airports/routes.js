const app = require("express")();

const {
  createAirport,
  updateAirport,
  getAirportById,
  getAllAirports,
  deleteAirport,
} = require("./Airports");
app.post("/create", createAirport);
app.get("/getById/:id", getAirportById);

app.get("/getAll", getAllAirports);

app.put("/update/:id", updateAirport);
app.delete("/delete/:id", deleteAirport);

// app.delete("/delete/:id",);

module.exports = app;
