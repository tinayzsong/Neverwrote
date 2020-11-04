'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const notebooks = [
      {
        title: 'Think big',
        createdAt: new Date('2010/08/17 12:09'),
        updatedAt: new Date('2010/08/17 12:09')
      },
      {
        title: 'Think small',
        createdAt: new Date('2011/03/06 15:32'),
        updatedAt: new Date('2011/03/06 15:47')
      }
    ];

    return queryInterface.bulkInsert('Notebooks', notebooks, {});
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
     return queryInterface.bulkDelete('Notebooks', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
