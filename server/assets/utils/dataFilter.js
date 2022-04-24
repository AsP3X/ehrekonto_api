const fs = require('fs');
const path = require('path');

const dataFilter = {}

/**
 * Return the project root directory of the project
 * @returns {String} rootDir
 */
dataFilter.getUsers = (users, filter) => {
  if (!filter) { filter = "default" }

  const dataFilterRaw = fs.readFileSync(path.resolve(__dirname, '../configs/dataFilter.json'));
  const dataFilter = JSON.parse(dataFilterRaw);

  const usersObj = users.map((user) => {
    const userObj = user.toJSON();

    dataFilter.users[filter].forEach((field) => {
      delete userObj[field];
    });

    return userObj;
  });

  return usersObj;
}

dataFilter.userData = (user, filter) => {
  if (!filter) { filter = "default" }

  const dataFilterRaw = fs.readFileSync(path.resolve(__dirname, '../configs/dataFilter.json'));
  const dataFilter = JSON.parse(dataFilterRaw);

  const userObj = user.toJSON();

  dataFilter.users[filter].forEach((field) => {
    delete userObj[field];
  });

  return userObj;
}

module.exports = dataFilter;