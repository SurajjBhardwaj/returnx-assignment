require("dotenv").config();
const express = require("express");
const connection = require('./config/db');
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");

const { notFound, errorHandler } = require("./Middleware/errorMiddleware");

connection();


const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.get("/data", (req, res) => {
    res.send("heyy dude");
})

app.get("/", (req, res) => {
    console.log("heyy suraj, why you are not working");
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler)





app.listen(port, () => console.log(`Server running on port http://localhost:${port}🔥`.blue.bold));