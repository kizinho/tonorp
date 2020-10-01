/* eslint-disable max-classes-per-file */
class InvalidLocationError extends Error {
  constructor(...params) {
    super(...params);
    this.name = 'InvalidLocationError';
  }
}

class DistanceFormatError extends Error {
  constructor(...params) {
    super(...params);
    this.name = 'DistanceFormatError';
  }
}

module.exports = { InvalidLocationError, DistanceFormatError };
