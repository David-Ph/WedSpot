// ? Import Dependencies
// //////////////////////
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

// initialize passport
// ///////////////////
// app.use(passport.initialize());
// CORS
app.use(cors());

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attact
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mins
  max: 100,
});

app.use(limiter);

// Use helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
} else {
  // create a write stream (in append mode)
  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    {
      flags: "a",
    }
  );

  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));
}
// ? import routes
// ////////////////
// const auth = require("./routes/auth");
const vendors = require("./routes/vendors");
const packageRouter = require("./routes/packages");
const requestRouter = require("./routes/requests");
const user_router = require("./routes/user");
const quotationsRouter = require("./routes/quotations");
const configRouter = require("./routes/config");
const todoRouter = require("./routes/todos");
const notificationRouter = require("./routes/notifications");

// ? import error handler
// //////////////////////
const errorHandler = require("./middlewares/errorHandler/errorHandler");

// ? use json and urlencoded
// /////////////////////////
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Prevent http param pollution
app.use(hpp());

// ? set routes
// /////////////
// app.use("/vendors", auth);
app.use("/todos", todoRouter);
app.use("/vendors", vendors);
app.use("/quotations", quotationsRouter);
app.use("/packages", packageRouter);
app.use("/requests", requestRouter);
app.use("/user", user_router);
app.use("/notifications", notificationRouter);
app.use("/config", configRouter);

app.all("*", async (req, res, next) => {
  try {
    next({
      messages: "Page not found",
      statusCode: 404,
    });
  } catch (error) {
    next(error);
  }
});

// ? use errorHandler
// ////////////////
app.use(errorHandler);

// ? listen to port
// //////////////////
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log("Listening to 3000"));
}

module.exports = app;
