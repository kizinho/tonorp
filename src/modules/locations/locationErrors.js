class InvalidLocationError extends Error {
  constructor(...params) {
    super(...params);
    this.name = InvalidLocationError;
  }
}

module.exports = { InvalidLocationError };
