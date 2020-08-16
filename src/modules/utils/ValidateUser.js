/* eslint-disable camelcase */
module.exports = class Details {
  constructor(userDetails) {
    if (!userDetails) {
      return false;
    }

    this.firstName = userDetails.firstName;
    this.lastName = userDetails.lastName;
    this.email = userDetails.email;
    this.username = userDetails.username;
    this.password = userDetails.password;
  }

  validateNames() {
    const name_regex = /^[a-zA-Z]+$/;
    if (name_regex.test(this.firstName) && name_regex.test(this.lastName)) {
      return true;
    }
    return false;
  }

  validateEmail() {
    const email_regex = /^\w+\.??\w+@\w+\.+?[a-zA-Z]+$/;
    if (email_regex.test(this.email)) {
      return true;
    }
    return false;
  }

  validateUsername() {
    const username_regex = /^\w+$/;
    if (username_regex.test(this.username)) {
      return true;
    }
    return false;
  }

  validatePassword() {
    if (this.password.length >= 8) {
      return true;
    }
    return false;
  }

  validate() {
    if (
      this.validateNames() &&
      this.validateEmail() &&
      this.validateUsername() &&
      this.validatePassword()
    ) {
      return true;
    }
    return false;
  }
};
