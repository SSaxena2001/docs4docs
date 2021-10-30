const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  typeOfDemand: String,
});

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  yearsOfExperience: String,
  hospitalName: String,
  patients: [PatientSchema],
  available: String,
});

module.exports = mongoose.model("Doctor", doctorSchema);
