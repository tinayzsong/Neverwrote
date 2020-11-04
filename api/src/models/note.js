'use strict';
module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    notebookId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Note;
};