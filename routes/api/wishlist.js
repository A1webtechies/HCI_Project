const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateWishlistInput = require("../../validation/wishlist");
// const validateExperienceInput = require('../../validation/experience');
// const validateEducationInput = require('../../validation/education');

// Load wishlist Model
const Wishlist = require("../../models/Wishlist");
// Load User Model
const User = require("../../models/User");

// @route   GET api/wishlist/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Wishlist Works" }));

// @route   GET api/wishlist
// @desc    Get current users wishlist
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Wishlist.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(wishlist => {
        if (!wishlist) {
          errors.nowishlist = "There is no wishlist for this user";
          return res.status(404).json(errors);
        }
        res.json(wishlist);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/wishlist
// @desc    Create or edit user wishlist
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateWishlistInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const wishlistFeilds = {};
    wishlistFeilds.user = req.user.id;
    if (req.body.shortBio) wishlistFeilds.shortBio = req.body.shortBio;
    if (req.body.desiredRent) wishlistFeilds.desiredRent = req.body.desiredRent;
    if (req.body.leaseTerm) wishlistFeilds.leaseTerm = req.body.leaseTerm;
    if (req.body.numberOfRenters)
      wishlistFeilds.numberOfRenters = req.body.numberOfRenters;
    if (req.body.numberOfCars)
      wishlistFeilds.numberOfCars = req.body.numberOfCars;
    if (req.body.numberOfPets)
      wishlistFeilds.numberOfPets = req.body.numberOfPets;
    if (req.body.city) wishlistFeilds.city = req.body.city;

    if (req.body.rentalType) wishlistFeilds.rentalType = req.body.rentalType;
    if (req.body.beds) wishlistFeilds.beds = req.body.beds;
    if (req.body.baths) wishlistFeilds.baths = req.body.baths;
    if (req.body.petsAllowed) wishlistFeilds.petsAllowed = req.body.petsAllowed;
    if (req.body.furnished) wishlistFeilds.furnished = req.body.furnished;
    if (req.body.priceRange) wishlistFeilds.priceRange = req.body.priceRange;
    Wishlist.findOne({ user: req.user.id }).then(wishlist => {
      if (wishlist) {
        // Update
        Wishlist.findOneAndUpdate(
          { user: req.user.id },
          { $set: wishlistFeilds },
          { new: true }
        ).then(wishlist => res.json(wishlist));
      } else {
        // Create

        new Wishlist(wishlistFeilds)
          .save()
          .then(wishlist => res.json(wishlist));
      }
    });
  }
);

module.exports = router;
