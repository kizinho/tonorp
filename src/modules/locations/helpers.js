/** Validates that a passed location is valid
 * @param {object} location - Location object
 * @returns {object} details of validation
 */
function isValidLocation(location) {
  const returnedObject = {
    valid: true,
    errorMessage: '',
  };

  if (!location.long || !location.lat) {
    returnedObject.valid = false;
    returnedObject.errorMessage = 'Longtitude and Latitude must be passed';
    return returnedObject;
  }

  if (typeof location.long !== 'number') {
    returnedObject.valid = false;
    returnedObject.errorMessage = `Longtitude should be a number, got ${typeof location.long}`;
    return returnedObject;
  }

  if (typeof location.lat !== 'number') {
    returnedObject.valid = false;
    returnedObject.errorMessage = `Latitude should be a number, got ${typeof location.lat}`;
    return returnedObject;
  }

  return returnedObject;
}

module.exports = { isValidLocation };
