// server/index.js
const express = require("express");
const Gun = require("gun");

// Create a new Express app
const app = express();
// app.use(express.json());

// Attach Gun to the server
app.use(Gun.serve);

// Other server configuration goes here...

// Start the server
const server = app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});

Gun({ web: server });
