const mysql = require("mysql2");

console.log(process.env.MYSQL_HOST);


// Create a connection to the database
const connection = mysql.createConnection({
  host: "mysql_server",//process.env.DATABASE_HOST,
  user: "lichty",
  password: "pass",
  database: "test_db"
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;