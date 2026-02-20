const express = require("express");
require('dotenv').config(); 
const mongooseConnection = require("./config/database");
const bookRouter = require("./routes/book.routes");
const cors = require("cors");

// database connection
mongooseConnection();

const app = express();

// middleware
app.use(express.json());

// use cors
app.use(cors());


// routes
app.use("/book", bookRouter);

// server
app.listen(8000, () => {
  console.log("Server Running on port 8000");
});
