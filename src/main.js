require('dotenv').config();
const app = require('express')();

app.use('/api/v1/attendance', require('./routes/attendance'));
app.use('/api/v1/groups', require('./routes/groupRoutes'));
app.use('/api/v1/users', require('./routes/user'));
app.use('/api/v1/auth', require('./routes/auth'));

module.exports = app;
