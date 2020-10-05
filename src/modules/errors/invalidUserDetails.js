class InvalidUserDetails extends Error {
  constructor(errors, ...args) {
    super(...args);
    this.name = 'InvalidUserDetails';
    this.errors = errors;
  }
}

module.exports = InvalidUserDetails;
