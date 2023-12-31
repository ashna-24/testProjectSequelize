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
    const searchKeyQuantity =
      `CREATE PROCEDURE SearchProducts(@searchKey NVARCHAR(MAX))
      AS
      BEGIN
          DECLARE @SearchTable TABLE (Value NVARCHAR(MAX));
      
          INSERT INTO @SearchTable (Value)
          SELECT value
          FROM STRING_SPLIT(@searchKey, ',');
      
          SELECT DISTINCT p.*
          FROM Products p
          INNER JOIN @SearchTable st ON CONVERT(NVARCHAR, p.id) LIKE '%' + st.Value + '%'
              OR CONVERT(NVARCHAR, p.quantity) LIKE '%' + st.Value + '%';
      END;
      `
    //  `
    //   CREATE PROCEDURE SearchProducts(@searchKey VARCHAR(MAX))
    //   AS
    //   BEGIN
    //     DECLARE @SearchValues TABLE (Value NVARCHAR(MAX));
    //     DECLARE @Separator NVARCHAR(1) = ',';

    //     WHILE CHARINDEX(@Separator, @searchKey) > 0
    //     BEGIN
    //       INSERT INTO @SearchValues (Value)
    //       VALUES (SUBSTRING(@searchKey, 1, CHARINDEX(@Separator, @searchKey) - 1));
    
    //       SET @searchKey = SUBSTRING(@searchKey, CHARINDEX(@Separator, @searchKey) + 1, LEN(@searchKey));
    //     END;

    //     INSERT INTO @SearchValues (Value) VALUES (@searchKey);

    //     SELECT DISTINCT p.*
    //     FROM Products p
    //     INNER JOIN @SearchValues sv ON CONVERT(NVARCHAR, p.id) LIKE '%' + sv.Value + '%' 
    //     OR CONVERT(NVARCHAR, p.quantity) LIKE '%' + sv.Value + '%';
    //   END;
    // `

    // // Execute the stored procedure query using queryInterface.sequelize.query
    return queryInterface.sequelize.query(searchKeyQuantity);
  },

  async down (queryInterface, Sequelize) {
    const dropProcedureQuery = `
      DROP PROCEDURE IF EXISTS SearchProducts;
    `;

    // Execute the drop stored procedure query using queryInterface.sequelize.query
    return queryInterface.sequelize.query(dropProcedureQuery);
  }
};
