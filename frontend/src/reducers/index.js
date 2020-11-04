
const Redux = require('redux');
const notebooks = require('./notebooks');
const notes = require('./notes');

module.exports = Redux.combineReducers({
  notebooks,notes
});
