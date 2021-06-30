const express = require("express");
// const bodyParser = require("body-parser");
// const coinbasePro = require("coinbase-pro");
// const publicClient = new coinbasePro.PublicClient();

const app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

// require("./routes/currency.routes.js")(app);
// require('./models/db.js')


const mysql = require("mysql2");
// Create a connection to the database
let connection;

console.log("I've started");

app.get("/", (req, res) => {
    // res.json({ message: "Howdy ho."})
    res.send('Yay!')
})

app.get("/connect", (req, res) => {
    // open the MySQL connection
    connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: "mysql",
        password: "pass",
        database: "test_db"
      });
    connection.connect(error => {
        if (error) throw error;
        res.send("Successfully connected to the database.");
    });
})

app.get('/insert', function (req, res) {
    const number = Math.round(Math.random() * 100)
    connection.connect(function(err) {
      if (err) throw err;
      const sql = `INSERT INTO numbers (number) VALUES (${number})`
      connection.query(sql, function (err, result) {
        if (err) throw err;
        res.send(`${number} inserted into table`)
      });
    })
  })
  
  app.get('/fetch', function (req, res) {
    connection.connect(function(err) {
      if (err) throw err;
      const sql = `SELECT * FROM numbers`
      connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result))
      });
    });
  })

app.get("/", (req, res) => {
    // res.json({ message: "Howdy ho."})
    res.send('Yay!')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
