const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const coinbasePro = require("coinbase-pro");
const publicClient = new coinbasePro.PublicClient();

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require("./routes/currency.routes.js")(app);

app.get("/", (req, res) => {
    res.json({ message: "Howdy ho."})
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})