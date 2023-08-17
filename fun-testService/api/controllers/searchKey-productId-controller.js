const {sequelize} = require('../../../fun-test-model/models');

exports.searchKeyProductId = async (req, res, next) => {
  const { searchKey } = req.body;
  
  try {
    const productDetails = await sequelize.query(
      'EXEC ProductDetails @productId = :productId',
      {
        replacements: {
            productId: searchKey,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    
    if (!productDetails || productDetails.length === 0) {
      return res.status(404).json({
        error: 'Product not found',
      });
    }
    console.log(productDetails);
    return res.json(productDetails);
  }
   catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Invalid data',
    });
  }
};
