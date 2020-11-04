'use strict';
module.exports = function(sequelize, DataTypes) {
  var Notebook = sequelize.define('Notebook', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Notebook;
};