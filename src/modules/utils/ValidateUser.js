/* eslint-disable camelcase */
module.exports = class Details {
  constructor(userDetails) {
    if (!userDetails) {
      return false;
    }

    this.errors = new Set();

    this.firstName = userDetails.firstName;
    this.lastName = userDetails.lastName;
    this.email = userDetails.email;
    this.username = userDetails.username;
    this.password = userDetails.password;
  }

  validateNames() {
    const name_regex = /^[a-zA-Z]+$/;
    const nameError = {
      code: 1,
      detail: 'Passed firstName or lastName is invalid',
    };

    if (name_regex.test(this.firstName) && name_regex.test(this.lastName)) {
      this.errors.delete(nameError);
      return true;
    }

    this.errors.add(nameError);
    return false;
  }

  validateEmail() {
    const email_regex = /^\w+\.??\w+@\w+\.+?[a-zA-Z]+$/;
    const emailError = {
      code: 2,
      detail: 'Email is not correctly formatted',
    };

    if (email_regex.test(this.email)) {
      this.errors.delete(emailError);
      return true;
    }
    this.errors.add(emailError);
    return false;
  }

  validateUsername() {
    const username_regex = /^\w+$/;
    const usernameError = {
      code: 3,
      detail: 'Username can only contain alphabets and numbers',
    };

    if (username_regex.test(this.username)) {
      this.errors.delete(usernameError);
      return true;
    }

    this.errors.add(usernameError);
    return false;
  }

  validatePassword() {
    const passwordError = {
      code: 4,
      detail: 'Password is too short',
    };
    if (this.password.length >= 8) {
      this.errors.delete(passwordError);
      return true;
    }

    this.errors.add(passwordError);
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

  returnErrors() {
    return [...this.errors];
  }
};
