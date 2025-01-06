const mongoose = require("mongoose");
const validator = require("validator");

const petSchema = new mongoose.Schema({
  weight: {
    type: String,
    required: [true, "Pet weight is required"],
    validate: {
      validator: function (v) {
        return /^\d+(\s*-\s*\d+)?$/.test(v);
      },
      message: 'Weight should be in format like "20" or "20 - 25"',
    },
  },
  url: {
    type: String,
    required: [true, "Pet image URL is required"],
  },
  name: {
    type: String,
    required: [true, "Pet name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  country_code: {
    type: String,
    default: "US",
    validate: {
      validator: function (v) {
        return /^[A-Z]{2}$/.test(v);
      },
      message: "Country code must be 2 uppercase letters",
    },
  },
  desc: {
    type: String,
    default: "undefined",
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },
  bred_for: {
    type: String,
    default: "Sled pulling",
    maxlength: [200, "Bred for description cannot exceed 200 characters"],
  },
  breed_group: {
    type: String,
    maxlength: [50, "Breed group cannot exceed 50 characters"],
  },
  life_span: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d+(\s*-\s*\d+)?\s*years?$/.test(v);
      },
      message: 'Life span should be in format like "10 years" or "10-12 years"',
    },
  },
  temperament: {
    type: String,
    maxlength: [200, "Temperament description cannot exceed 200 characters"],
  },
  origin: {
    type: String,
    default: "United States",
    maxlength: [100, "Origin cannot exceed 100 characters"],
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
