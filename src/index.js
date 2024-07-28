const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./router/user");

dotenv.config();
const connectDb = require("./config/connectDb");


connectDb();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("Server is running at port "+PORT);
});

