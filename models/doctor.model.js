const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  yearsOfExperience: String,
  hospitalName: String,
  patientsList: Array,
  available: String,
});

module.exports = mongoose.model("Doctor", doctorSchema);
