const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); // Middleware to parse JSON

// GET request to return "Hello, Taha"
app.get('/hello/taha', (req, res) => {
  res.send("Hello, Taha it's from the server");
});

// POST request to receive a JSON object of a profile
app.post('/profile', (req, res) => {
  const profile = req.body;

  // Validate required fields
  const requiredFields = ['Name', 'Title', 'TargetedKeywords', 'Education', 'Certification', 'Contact'];
  const missingFields = requiredFields.filter(field => !profile[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
  }

  // Append the profile to a file
  fs.appendFile('profiles.json', JSON.stringify(profile) + '\n', err => {
    if (err) {
      return res.status(500).json({ error: 'Could not save profile' });
    }
    res.status(200).json({ message: 'Profile saved' });
  });
});

// GET request to return all profiles
app.get('/profiles', (req, res) => {
  fs.readFile('profiles.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read profiles' });
    }
    const profiles = data.trim().split('\n').map(line => JSON.parse(line));
    res.status(200).json(profiles);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
