const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});


app.use(bodyParser.json());


app.post('/login', (req, res) => {
  const { username, password } = req.body;


  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});

// Logout endpoint (if needed)
app.post('/logout', (req, res) => {
  // Perform logout logic (if needed)
  res.json({ success: true, message: 'Logout successful' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
