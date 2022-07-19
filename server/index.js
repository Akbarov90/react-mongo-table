const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const mongoose  = require('mongoose');
const cors = require('cors');

app.use(cors());
mongoose
    .connect("mongodb+srv://akbarovich_90:abdu2004@cluster0.d4qxv.mongodb.net/mern-table?retryWrites=true&w=majority")
    .then(()=> console.log("DB ok"))
    .catch((err)=> console.log("DB error", err))
require('dotenv').config();

app.use(express.json())

app.get("/", (req, res) => {
    res.send({Project: "Mern crud app"})
})
app.use(bodyparser.json());

app.use("/products", require("./routes/products"))

const PORT = process.env.PORT;

app.listen(PORT || 5000);
