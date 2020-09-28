const { Client } = require('@googlemaps/google-maps-services-js');
const { InvalidLocationError } = require('./locationErrors');
const { isValidLocation } = require('./helpers');

/** Utility methods to manage locations */
class LocationManager {
  constructor(location) {
    const validLocation = isValidLocation(location);
    if (!validLocation.valid) {
      throw new InvalidLocationError(validLocation.errorMessage);
    }

    this.origin_location = location;
    this.api_key = process.env.MAPS_API_KEY;
    this.map_client = new Client({});
  }

  /** Check if supplied location is within the passed in radius
   * @param {object} location - Location object containing a Long and Lat
   * @param {number} radius - Radius to check locations against. Radius is in
   * meters
   */
  isInRadius(location, radius) {
    const validLocation = isValidLocation(location);
    if (!validLocation.valid) {
      throw new InvalidLocationError(validLocation.errorMessage);
    }

    if (typeof radius !== 'number') {
      throw new TypeError('Radius should be number');
    }

    this.map_client
      .distancematrix({
        params: {
          origins: [this.origin_location.lat, this.origin_location.long],
          destinations: [location.lat, location.long],
        },
      })
      .then((r) => {
        return r;
      });
  }
}

module.exports = LocationManager;
