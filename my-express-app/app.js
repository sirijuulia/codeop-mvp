const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

//create two routers, one per table
const actionsRouter = require("./routes/actions");

//this one probably not needed until later
const usersRouter = require("./routes/users");

//creating the express api app
const app = express();

//running various middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//sending requests to different router files
app.use("/api/actions", actionsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
