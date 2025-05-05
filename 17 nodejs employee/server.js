const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/employees', (req, res) => {
  fs.readFile('employees.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to load employee data' });
    }
    res.json(JSON.parse(data));
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
