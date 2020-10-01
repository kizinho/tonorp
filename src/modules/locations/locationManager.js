// Third party libraries
const { Client } = require('@googlemaps/google-maps-services-js');

const { InvalidLocationError } = require('./locationErrors');
const { isValidLocation, convertDistanceToMetres } = require('./helpers');

/** Utility class to manage locations */
class BaseManager {
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
   * @returns {Promise<boolean>} returns true or false depending on weather
   * the location is within the radius
   */
  async isInRadius(location, radius) {
    if (typeof radius !== 'number') {
      throw new TypeError('Radius should be number');
    }

    try {
      const difference = await this.locationDifference(
        this.origin_location,
        location
      );

      return difference <= radius;
    } catch (e) {
      /* handle error */
      console.log(e);
      throw e;
    }
  }

  /** Return distance between two locations
   * @param {{lat: string, long: string}} origin - Starting origin location
   * @param {{lat: string, long: string}} destination - Destination to calculate difference
   * from
   * @returns {Promise<number>} Difference between the two locations in metres
   */
  async locationDifference(origin, destination) {
    const validOrigin = isValidLocation(origin);
    const validDestination = isValidLocation(destination);

    if (!validOrigin.valid) {
      throw new InvalidLocationError(validOrigin.errorMessage);
    }

    if (!validDestination.valid) {
      throw new InvalidLocationError(validDestination.errorMessage);
    }

    try {
      const r = await this.map_client.distancematrix({
        params: {
          origins: [{ lat: origin.lat, lng: origin.long }],
          destinations: [{ lat: destination.lat, lng: destination.long }],
          key: this.api_key,
        },
      });
      const result = convertDistanceToMetres(
        r.data.rows[0].elements[0].distance.text
      );
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

module.exports = BaseManager;
