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
    // `CREATE PROCEDURE ProductDetails
    // @productId NVARCHAR(MAX)
    // AS
    // BEGIN
    // DECLARE @sql NVARCHAR(MAX);
    
    // SET @sql = N'
    // SELECT *
    // FROM Products
    // WHERE id IN (' + @productId + ')';
    
    // EXEC sp_executesql @sql;
    // END;
    // `
    // `CREATE PROCEDURE ProductDetails
    //     @productId VARCHAR
    //   AS
    //   BEGIN
    //     SELECT
    //       *
    //     FROM
    //       Products
    //     WHERE
    //       id LIKE '%' + @productId + '%';
    //   END;`

    `CREATE PROCEDURE ProductDetails
    @productId NVARCHAR(MAX)
  AS
  BEGIN
    DECLARE @sql NVARCHAR(MAX);

    SET @sql = N'
      SELECT *
      FROM Products
      WHERE id IN (''' + REPLACE(@productId, ',', ''',''') + ''')
        OR id LIKE ''%'' + @productId + ''%''';

    EXEC sp_executesql @sql;
  END;
`
    
    // // Execute the stored procedure query using queryInterface.sequelize.query
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
