require("dotenv").config();
const express = require("express");
const app = express();


const port = process.env.PORT || 5000;


app.get("/data", (req, res) => {
    res.send("heyy dude");
})

app.listen(port, () => console.log(`Server running on port http://localhost:${port} 🔥`));