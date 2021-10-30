const mongoose = require('mongoose');
const Patient = require('./patient.model');
const doctorSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    yearsOfExperience:String,
    patients: Array[Patient],
    available: String
});

module.exports = mongoose.model("Doctor", doctorSchema);