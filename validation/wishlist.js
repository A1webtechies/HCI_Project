const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateWishlistInput(data) {
  let errors = {};

  data.shortBio = !isEmpty(data.shortBio) ? data.shortBio : "";

  data.leaseTerm = !isEmpty(data.leaseTerm) ? data.leaseTerm : "";

  data.city = !isEmpty(data.city) ? data.city : "";
  data.rentalType = !isEmpty(data.rentalType) ? data.rentalType : "";
  data.beds = !isEmpty(data.beds) ? data.beds : "";
  data.baths = !isEmpty(data.baths) ? data.baths : "";

  if (Validator.isEmpty(data.shortBio)) {
    errors.shortBio = "shortBio is required";
  }

  if (Validator.isEmpty(data.leaseTerm)) {
    errors.leaseTerm = "Leaseterm field is required";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "city field is required";
  }

  if (Validator.isEmpty(data.beds)) {
    errors.beds = "beds field is required";
  }
  if (Validator.isEmpty(data.baths)) {
    errors.baths = "baths field is required";
  }
  if (!Validator.isLength(data.shortBio, { min: 20, max: 100 })) {
    errors.shortBio = "Short needs to between 20 and 100 characters";
  }
  if (data.desiredRent > 20000 || data.desiredRent < 500) {
    errors.desiredRent = "Desired Rent must be in between 500 and 20000";
  }
  if (data.numberOfRenters > 20 || data.numberOfRenters < 1) {
    errors.numberOfRenters = "Number of Renters must be in between 1 and 20";
  }
  if (data.numberOfCars > 10 || data.numberOfCars < 0) {
    errors.numberOfCars = "Number of cars must be in between 1 and 10";
  }
  if (data.numberOfPets > 5 || data.numberOfPets < 0) {
    errors.numberOfPets = "Number of pets must be in between 0 and 5";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
