require('dotenv').config();

const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();

app.set('env', process.env.NODE_ENV);

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/api', apiRoutes);

// error handling
app.use('*', (err, req, res) => {
  res.status(500);
  res.json({
    error: err,
  });
});

app.listen(process.env.NODE_PORT, process.env.NODE_HOST, () => {
  console.log(`Listening at http://${process.env.NODE_HOST}:${process.env.NODE_PORT}`);
});

module.exports = app;
