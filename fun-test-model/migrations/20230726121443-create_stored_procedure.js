'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const createProcedure = `CREATE PROCEDURE AddToCart
      @productId INT=NULL, @user INT=NULL, @quantity INT=NULL
    AS
    BEGIN
      INSERT INTO Carts (productId, [user], quantity)
      VALUES(@productId,@user,@quantity)
    END;`

    // // Execute the stored procedure query using queryInterface.sequelize.query
    return queryInterface.sequelize.query(createProcedure);
  },

  async down (queryInterface, Sequelize) {
    const dropProcedureQuery = `
      DROP PROCEDURE IF EXISTS AddToCart;
    `;

    // Execute the drop stored procedure query using queryInterface.sequelize.query
    return queryInterface.sequelize.query(dropProcedureQuery);
  }
};
