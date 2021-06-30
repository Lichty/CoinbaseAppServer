const sql = require("./db.js");

// constructor
const Currency = function (currency) {
  this.currencyId = currency.currency;
  this.name = currency.name;
  this.min_size = currency.min_size;
  this.status = currency.status;
  this.message = currency.message;
  this.max_precision = currency.max_precision;
  this.type = currency.type;
  this.symbol = currency.symbol;
};

//TODO: add update

Currency.insert = (newCurrency, result) => {
  sql.query("INSERT INTO currencies SET ?" +
    "ON DUPLICATE KEY UPDATE " +
    "name = ? " +
    "min_size = ? " +
    "status = ? " +
    "message = ? " +
    "max_precision = ? " +
    "type = ? " +
    "symbol = ? ",
    newCurrency,
    newCurrency.name,
    newCurrency.min_size,
    newCurrency.status,
    newCurrency.message,
    newCurrency.max_precision,
    newCurrency.type,
    newCurrency.symbol,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created currency: ", {
        id: res.insertId,
        ...newCurrency
      });
      result(null, {
        id: res.insertId,
        ...newCurrency
      });
    });
};

Currency.findById = (currencyId, result) => {
  sql.query(`SELECT * FROM currencies WHERE currency = ${currencyId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found currency: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Currency with the id
    result({
      kind: "not_found"
    }, null);
  });
};

Currency.getAll = result => {
  sql.query("SELECT * FROM currencies", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("currencies: ", res);
    result(null, res);
  });
};

module.exports = Currency;