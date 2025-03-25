const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sites = require("./sites");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dynamic site-specific routes
app.use("/:siteName/*", (req, res, next) => {
  const { siteName } = req.params;
  const site = sites[siteName];

  if (!site) {
    return res.status(404).json({
      error: "Site not found",
      message: `No configuration found for site: ${siteName}`,
    });
  }

  // Add site configuration to request object for use in route handlers
  req.site = site;
  next();
});

// Site-specific routes
app.get("/:siteName/credentials", (req, res) => {
  const { siteName } = req.params;
  const site = req.site;

  // Return site-specific credentials (excluding sensitive tokens)
  res.json({
    siteName,
    domain: site.domain,
    apiVersion: site.apiVersion,
    corsOrigins: site.corsOrigins,
  });
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Shopify Storefront API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
