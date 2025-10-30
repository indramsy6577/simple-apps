// test git push
const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('node:path');
require('dotenv').config();

app.disable('x-powered-by');

// Import Middleware
const logger = require('./middleware/logger');
app.use(logger);
const connection = require('./middleware/db_connect');

// Dashboard
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/app1', (req, res) => {
  res.send('Hello this Apps 1!');
});

app.get('/app2', (req, res) => {
  res.send('Hello this App 2!');
});

app.get('/users', (req, res, next) => {
  const sql = "SELECT * FROM tb_data ORDER BY id desc";
  connection.query(sql, (error, fields) => {
    if (error) {
      console.log('error', error);
      res.status(500).send('Database error');
    } else {
      res.send(fields);
    }
  });
});

// Jalankan server hanya jika bukan dalam mode testing
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.APP_PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}

module.exports = app;
