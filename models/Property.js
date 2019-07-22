const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PropertySechma = new Schema({
  title: {
    type: String,
    required: true
  },
  picName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  amenties: {
    type: [String],
    required: true
  },
  monthlyRent: {
    type: Number,
    required: true
  },
  beds: {
    type: String
  },
  baths: {
    type: String
  },
  unitType: {
    type: String,
    required: true
  },
  petsAllowed: {
    type: Boolean,
    default: false
  },
  furnished: {
    type: Boolean,
    default: false
  },
  leaseTerm: {
    type: String,
    required: true,
    default: "Monthly"
  }
});
module.exports = Property = mongoose.model("property", PropertySechma);
