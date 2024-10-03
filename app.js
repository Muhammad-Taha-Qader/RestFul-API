const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); // Middleware to parse JSON

// GET request to return "Hello, Taha"
app.get('/hello/taha', (req, res) => {
  res.send("Hello, Taha it's from the server");
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
