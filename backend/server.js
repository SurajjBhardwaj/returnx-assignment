require("dotenv").config();
const express = require("express");
const app = express();
const connection = require('./config/db');
const colors = require("colors");

connection();


const port = process.env.PORT || 5000;


app.get("/data", (req, res) => {
    res.send("heyy dude");
})

app.get("/", (req, res) => {
    console.log("heyy suraj, why you are not working");
});






app.listen(port, () => console.log(`Server running on port http://localhost:${port}🔥`.blue.bold));