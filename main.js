const express = require('express');
const db = require('./database'); // A fictional database connection
const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // DANGEROUS: User input is directly inserted into the query string.
  const sqlQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  console.log(`Executing: ${sqlQuery}`);

  db.query(sqlQuery, (err, results) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (results.length > 0) {
      res.send('Login successful!');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

app.listen(3000);
