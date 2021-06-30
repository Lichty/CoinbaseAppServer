const Currency = require("../models/currency.model.js");

// Create and Save a new Currency
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Currency
  const currency = new Currency({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Currency in the database
  Currency.insert(currency, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Currency."
      });
    else res.send(data);
  });
};

// Retrieve all currencies from the database.
exports.findAll = (req, res) => {
  Currency.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving currencies."
      });
    else res.send(data);
  });
};

// Find a single Currency with a currencyId
exports.findOne = (req, res) => {
  Currency.findById(req.params.currencyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Currency with id ${req.params.currencyId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Currency with id " + req.params.currencyId
        });
      }
    } else res.send(data);
  });
};