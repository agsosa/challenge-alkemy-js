// API DOCUMENTATION: https://documenter.getpostman.com/view/13863838/TzCV45Ku

// TODO: Add node-rate-limiter-flexible
// TODO: Stress test
require("dotenv").config();
require("module-alias/register");
const database = require("@lib/database");
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("@routes");
const utils = require("@lib/utils");

const env = process.env.NODE_ENV || "development";
port = process.env.PORT || 4002;
const app = express();

// Add global middlewares
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use(cors()); // TODO: Change before deploy!
// app.use(morgan("combined")); // TODO: CHECK

// Add routes middlewares
app.use("/api/transactions", routes.transactions);

// Handle root path
app.get("/", (req, res) => res.send("OK"));

// Show stack trace errors on development environment
if (env === "development") {
  app.use(function (err, req, res, next) {
    console.error(err.stack);

    res.status(err.status || 500);

    res.json({
      error: true,
      message: err.message,
      stack: err.stack,
    });
  });
}

// Hide stack trace errors on production environment
app.use(function (err, req, res, next) {
  utils.sendFailedResponse(res, err.message, err.status || 500);
});

// Handle 404
app.use(function (req, res, next) {
  utils.sendFailedResponse(res, "endpoint not found", 404);
});

// Start server
app.listen(port);
console.log("Running server on port", port);

// Graceful shutdown
// TODO: TEST!!
process.on("SIGTERM", () => {
  debug("SIGTERM signal received: shutdown app");
  database.end(() => {
    debug("database closed");
    server.close(() => {
      debug("HTTP server closed");
    });
  });
});
