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
    const productDetails =  

    `CREATE PROCEDURE ProductDetails(@productId NVARCHAR(MAX))
    AS
    BEGIN
      DECLARE @SearchTable TABLE (Value NVARCHAR(MAX));
  
      INSERT INTO @SearchTable (Value)
      SELECT value
      FROM STRING_SPLIT(@productId, ',');
  
      SELECT DISTINCT p.*
      FROM Products p
      INNER JOIN @SearchTable st ON CONVERT(NVARCHAR, p.id) LIKE '%' + st.Value + '%';
    END;
    `
    
    // Execute the stored procedure query using queryInterface.sequelize.query
    return queryInterface.sequelize.query(productDetails);
  },

  async down (queryInterface, Sequelize) {
    const dropProcedureQuery = `
      DROP PROCEDURE IF EXISTS ProductDetails;
    `;

    // Execute the drop stored procedure query using queryInterface.sequelize.query
    return queryInterface.sequelize.query(dropProcedureQuery);
  }
};
