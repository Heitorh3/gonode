"use strict";

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: "required|unique:users",
      email: "required|email|unique:users",
      password: "required|confimed"
    };
  }
}

module.exports = User;
