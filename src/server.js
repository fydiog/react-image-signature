const express = require("express");
const app = express();

// Import multer to handle file uploads
const multer = require("multer");

// Import CORS middleware to allow CrossOrigin Requests to this server
const cors = require("cors");

// Create Upload Instace to use in route middlware
const upload = multer({ dest: "uploads/" });

// Add CORS Middleware to express instance.
app.use(cors());

app.get("/", (req, res) => {
  res.send("We are live");
});

// Route Controller for uploading a single file
app.post("/single", upload.single("singleImage"), (req, res) => {
  try {
    res.status(200).send({ message: "File uploaded successfully." });
  } catch (err) {
    res.status(400).send({ message: "Error uploading file." });
  }
});
// Route Controller for uploading multiple files
// Some code here...

// Route Controller for uploading base64 and convert to file.
// Some code here...

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
