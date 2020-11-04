'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const notes = [
      {
        title: 'A silly post',
        content: 'Roses are red, violets are blue, I am a poet.',
        notebookId: 1,
        createdAt: new Date('2010/08/17 12:09'),
        updatedAt: new Date('2010/08/17 12:09')
      },
      {
        title: 'New technology',
        content: 'These things called "computers" are fancy.',
        notebookId: 1,
        createdAt: new Date('2011/03/06 15:32'),
        updatedAt: new Date('2011/03/06 15:47')
      }
    ];

     return queryInterface.bulkInsert('Notes', notes, {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {

     return queryInterface.bulkDelete('Notes', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
