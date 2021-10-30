var mongoose = require("mongoose");
var PatientSchema = new mongoose.Schema({
  name:String,  
  email: String,
  password: String,
  typeOfDemand: String
});
module.exports = mongoose.model("Patient", PatientSchema);
