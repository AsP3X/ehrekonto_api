const validator = {}
const fs = require('fs');
const path = require('path');

// check if the password "password" is a common password
const isCommonPassword = (password) => {
  // load common passwords list
  const commonPasswordsRaw = fs.readFileSync(path.join(__dirname, 'common-passwords.json'), 'utf8');
  const commonPasswords = JSON.parse(commonPasswordsRaw);

  for (let i = 0; i < commonPasswords.length; i++) {
    if (password === commonPasswords[i]) {
      return true;
    }
  }
  return false;
}

validator.passwordStrength = (password) => {
  let passwordStrength = 0;

  // for every alphabetical character in the password, add 1 to the passwordStrength
  for (let i = 0; i < password.length; i++) {
    if (password[i].match(/[a-z]/i)) {
      passwordStrength++;
    }
  }

  // for every numerical character in the password, add 1 to the passwordStrength
  for (let i = 0; i < password.length; i++) {
    if (password[i].match(/[0-9]/)) {
      passwordStrength++;
    }
  }

  // for every special character in the password, add 1 to the passwordStrength
  for (let i = 0; i < password.length; i++) {
    if (password[i].match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      passwordStrength++;
    }
  }

  // check if the password is at least 8 characters long
  if (password.length >= 8) {
    passwordStrength++;
  }

  // check if the password is at least 12 characters long
  if (password.length >= 12) {
    passwordStrength++;
  }

  // check if the password has no repeating characters (e.g. "aaaaaa") or repeating characters in groups of 2 or more (e.g. "abcabc")
  if (password.match(/(.)\1{2,}/g) === null) {
    passwordStrength++;
  }

  if (isCommonPassword(password)) {
    passwordStrength = 0;
  }

  return passwordStrength;
}

module.exports = validator;