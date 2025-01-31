require("dotenv").config({ path: './.env' });
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());

const authroutes = require("./routes/auth.js");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
app.use(cors());
app.use("/api/auth",authroutes)


const PORT = process.env.PORT||7070;

app.listen(PORT,() => console.log("Server is Started"));