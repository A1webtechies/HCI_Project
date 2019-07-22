const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
// Load wishlist Model
const Property = require("../../models/Property");
// Load User Model

// @route   GET api/wishlist/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Property works" }));

// @route   GET api/property
// @desc    Get all properties
// @access  Public
router.get(
  "/city",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    Property.find({ city: req.user.city })
      .then(properties => {
        if (!properties) {
          errors.noprofile = "There are no properties";
          return res.status(404).json(errors);
        }

        res.json(properties);
      })
      .catch(err =>
        res.status(404).json({ profile: "There are no properties" })
      );
  }
);

// @route   GET api/property/city
// @desc    Get all properties
// @access  Public
router.get(
  "/",

  (req, res) => {
    Property.find()
      .then(properties => {
        if (!properties) {
          errors.noprofile = "There are no properties";
          return res.status(404).json(errors);
        }

        res.json(properties);
      })
      .catch(err =>
        res.status(404).json({ profile: "There are no properties" })
      );
  }
);

// @route   POST api/property
// @desc    Create properties
// @access  Private
router.post("/", (req, res) => {
  // Get fields
  const propertyFeilds = {};

  if (req.body.title) propertyFeilds.title = req.body.title;
  if (req.body.unitType) propertyFeilds.unitType = req.body.unitType;
  if (req.body.picName) propertyFeilds.picName = req.body.picName;
  if (req.body.city) propertyFeilds.city = req.body.city;
  if (req.body.address) propertyFeilds.address = req.body.address;
  if (req.body.desc) propertyFeilds.desc = req.body.desc;
  if (req.body.amenties) propertyFeilds.amenties = req.body.amenties;
  if (req.body.monthlyRent) propertyFeilds.monthlyRent = req.body.monthlyRent;
  if (req.body.beds) propertyFeilds.beds = req.body.beds;
  if (req.body.baths) propertyFeilds.baths = req.body.baths;
  if (req.body.petsAllowed) propertyFeilds.petsAllowed = req.body.petsAllowed;
  if (req.body.furnished) propertyFeilds.furnished = req.body.furnished;
  if (req.body.leaseTerm) propertyFeilds.leaseTerm = req.body.leaseTerm;
  new Property(propertyFeilds)
    .save()
    .then(properties => res.json(properties))
    .catch(err => res.json(err));
});

module.exports = router;
