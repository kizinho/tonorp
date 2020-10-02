// Third-party dependencies
require('dotenv').config();

// Application modules
const BaseManager = require('./locationManager');

class LocationManager extends BaseManager {}

module.exports = LocationManager;
