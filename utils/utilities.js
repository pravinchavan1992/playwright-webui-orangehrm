const { faker } = require("@faker-js/faker");

function getLoginName() {
  return `auto_${faker.internet.username().toLowerCase()}`;
}

function getEmployeeID() {
  return "a" + faker.number.int({ min: 1000, max: 9999 });
}
function getFirstName() {
  return `auto_${faker.person.firstName().toLowerCase()}`;
}
function getMiddleName() {
  return `auto_${faker.person.firstName().toLowerCase()}`;
}
function getLastName() {
  return `auto_${faker.person.lastName().toLowerCase()}`;
}

module.exports = {
  getLoginName,
  getEmployeeID,
  getFirstName,
  getMiddleName,
  getLastName,
};