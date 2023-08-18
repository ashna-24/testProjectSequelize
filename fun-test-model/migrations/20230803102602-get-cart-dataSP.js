'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const createProcedure =`CREATE PROCEDURE GetAllCartData
      AS
      BEGIN
          SELECT * FROM Carts;
      END;
    `

    // Execute the stored procedure query using queryInterface.sequelize.query
    return queryInterface.sequelize.query(createProcedure);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
