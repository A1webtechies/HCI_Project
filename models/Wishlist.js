const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  shortBio: {
    type: String,
    required: true
  },
  desiredRent: {
    type: Number,
    required: true
  },
  leaseTerm: {
    type: String,
    required: true
  },
  numberOfRenters: {
    type: Number,
    required: true
  },
  numberOfCars: {
    type: Number,
    required: true
  },
  numberOfPets: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  rentalType: {
    type: [String]
  },
  beds: {
    type: String
  },
  baths: {
    type: String
  },
  petsAllowed: {
    type: Boolean
  },
  furnished: {
    type: Boolean
  },
  priceRange: {
    type: Number,
    default: 1000
  }
});

module.exports = Wishlist = mongoose.model("wishlist", WishlistSchema);
