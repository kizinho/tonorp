require('dotenv').config();
const app = require('express')();

app.use('/api/v1/attendance', require('./routes/attendance'));

module.exports = app;
