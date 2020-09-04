require('dotenv').config();
const app = require('express')();

app.use('/api/v1/attendance', require('./routes/attendance'));
app.use('/api/v1/user', require('./routes/user'));

module.exports = app;
