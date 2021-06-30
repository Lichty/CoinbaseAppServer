module.exports = app => {
  const currencies = require("../controllers/currency.controller.js");

  // Update currency list from Coinbase Pro
  app.put("/currencies", currencies.update)

  // Retrieve all Currencies
  app.get("/currencies", currencies.findAll);

  // Retrieve a single Currency with currencyId
  app.get("/currencies/:currencyId", currencies.findOne);
};