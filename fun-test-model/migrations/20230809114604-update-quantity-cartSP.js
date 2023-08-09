'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const updateProcedure =  `
    CREATE PROCEDURE UpdateCartQuantity
      @id INT,
      @newQuantity INT
    AS
    BEGIN
      DECLARE @recordExists BIT;

      -- Check if the record exists
      SELECT @recordExists = CASE WHEN EXISTS (SELECT 1 FROM Carts WHERE id = @id) THEN 1 ELSE 0 END;

      IF @recordExists = 1
      BEGIN
          UPDATE Carts
          SET quantity = @newQuantity
          WHERE id = @id;

          SELECT 'Record updated successfully.' AS Message;
      END
      ELSE
      BEGIN
          SELECT 'Record not found.' AS Message;
      END;
    END;

    `

    // // Execute the stored procedure query using queryInterface.sequelize.query
    await queryInterface.sequelize.query(updateProcedure);
    
  },

  async down (queryInterface, Sequelize) {
    const dropProcedureQuery = `
      DROP PROCEDURE IF EXISTS AddToCart;
    `;

    // Execute the drop stored procedure query using queryInterface.sequelize.query
    return queryInterface.sequelize.query(dropProcedureQuery);
  }
};
