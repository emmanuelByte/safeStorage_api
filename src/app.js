const express = require("express");
// const cors = require("cors");
const createError = require("http-errors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const listEndPoints = require("list_end_points");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes");
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Here
app.use("/api", router);
//  To Here

listEndPoints.default(app);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);
module.exports = app;
