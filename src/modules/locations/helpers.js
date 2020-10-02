const { DistanceFormatError } = require('./locationErrors');

/** Validates that a passed location is valid
 * @param {object} location - Location object
 * @returns {object} details of validation
 */
function isValidLocation(location) {
  const cordRegex = /^(-)?\d+(\.\d+)?$/;

  const returnedObject = {
    valid: true,
    errorMessage: '',
  };

  if (!location.long || !location.lat) {
    returnedObject.valid = false;
    returnedObject.errorMessage = 'Longtitude and Latitude must be passed';
    return returnedObject;
  }

  if (!cordRegex.test(location.long)) {
    returnedObject.valid = false;
    returnedObject.errorMessage = `Invalid longtitude format, longtitude should look like 413.444`;
    return returnedObject;
  }

  if (!cordRegex.test(location.lat)) {
    returnedObject.valid = false;
    returnedObject.errorMessage = `Invalid longtitude format, latitude should look like 413.444`;
    return returnedObject;
  }

  return returnedObject;
}

function isValidDistanceFormat(distance) {
  const formatRegex = /^\d+ [a-zA-Z]+$/;

  return formatRegex.test(distance);
}

/** Takes a location returned by Google maps distancematrix and tries to
 * convert it to metres
 * @param {string} location - Location to be converted - format e.g 20 km
 * @returns {number} Converted location
 */
function convertDistanceToMetres(distance) {
  if (!distance || typeof distance !== 'string') {
    throw new TypeError(
      `Passed invalid distance, expected string but got ${typeof distance}`
    );
  }

  if (!isValidDistanceFormat(distance)) {
    throw new DistanceFormatError(
      'Distance passed wrongly, should be in the format - 10 km, notice the space?'
    );
  }

  const distanceSplit = distance.split(' ');

  if (distanceSplit[1] === 'm') {
    return parseInt(distanceSplit[0], 10);
  }

  const distanceInMetres = parseInt(distanceSplit[0], 10) * 1000;

  return distanceInMetres;
}

module.exports = { isValidLocation, convertDistanceToMetres };
