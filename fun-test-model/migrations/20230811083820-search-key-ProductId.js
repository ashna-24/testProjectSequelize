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
      // `CREATE PROCEDURE ProductDetails(@productId VARCHAR(MAX))
      // AS
      // BEGIN
      //   DECLARE @SearchKeys TABLE (Value NVARCHAR(MAX));
      //   DECLARE @Separator NVARCHAR(1) = ',';
      //   WHILE CHARINDEX(@Separator, @productId) > 0
      //     BEGIN
      //       INSERT INTO @SearchKeys (Value)
      //       VALUES (SUBSTRING(@productId, 1, CHARINDEX(@Separator, @productId) - 1));
      //       SET @productId = SUBSTRING(@productId, CHARINDEX(@Separator, @productId) + 1, LEN(@productId));
      //     END;
      //   INSERT INTO @SearchKeys (Value) VALUES (@productId);
      //   SELECT DISTINCT p.*
      //   FROM Products p
      //   INNER JOIN @SearchKeys sv ON CONVERT(NVARCHAR, p.id) LIKE '%' + sv.Value + '%';
      // END;`

    `CREATE PROCEDURE SearchProducts(@searchKey NVARCHAR(MAX))
    AS
    BEGIN
        DECLARE @SearchTable TABLE (Value NVARCHAR(MAX));
    
        INSERT INTO @SearchTable (Value)
        SELECT value
        FROM STRING_SPLIT(@searchKey, ',');
    
        SELECT DISTINCT p.*
        FROM Products p
        INNER JOIN @SearchTable sv ON CONVERT(NVARCHAR, p.id) LIKE '%' + sv.Value + '%';
    END;
    `

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
