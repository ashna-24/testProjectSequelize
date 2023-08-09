const { Product, User, Cart, sequelize } = require('../../../fun-test-model/models');

exports.getCartData = async(req,res,next)=>{
  try {
    const cartData = await Product.sequelize.query('EXEC GetAllCartData');
    console.log(cartData);
    res.status(200).json({
      success: true,
      data: cartData[0],
    });
  } 
  catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart data',
    });
  }
}

exports.insertToCart = async (req, res, next) => {
  const { productId, user, quantity } = req.body;
  try {
    await sequelize.query(
      'EXEC AddToCart @productId = :productId, @user = :user, @quantity = :quantity',
      {
        replacements: { 
          productId, 
          user, 
          quantity 
        },
        type: sequelize.QueryTypes.SELECT
      }
    );
    res.status(201).json({
      success: true,
      message: 'Data added to cart successfully',
    });
  } 
  catch (err) {
    console.error('Error adding data to cart:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to add data to cart',
    });
  }
};

exports.deleteData = async (req, res, next) => {
  const removedata = req.params.id;
  try {
    const result = await sequelize.query(
      'EXEC DeleteCartRecord @id = :id', 
      {
        replacements: { 
          id: removedata 
        },
        type: sequelize.QueryTypes.SELECT
      }
    );

    const message = result[0].Message;

    if (message === 'Record deleted successfully.') {
      res.status(200).json({
        success: true,
        message: 'Deleted successfully',
      });
    } 
    else {
      res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }
  } 
  catch (err) {
    console.log('Error', err);
    res.status(404).json({
      success: false,
      message: 'Error',
    });
  }
};

exports.updateCartQuantity = async (req, res, next) => {
  const updateDataId = req.params.id;
  const { newQuantity } = req.body;
  try {
    const result = await sequelize.query(
      'EXEC UpdateCartQuantity @id = :id, @newQuantity = :newQuantity', 
      {
        replacements: { 
          id: updateDataId, 
          newQuantity: newQuantity 
        },
        type: sequelize.QueryTypes.SELECT
      }
    );

    const message = result[0].Message;

    if (message === 'Record updated successfully.') {
      const updatedRecord = await Cart.findByPk(updateDataId);
      res.status(200).json({
        success: true,
        message: 'Updated successfully',
        data: updatedRecord
      });
    } 
    else {
      res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }
  } 
  catch (err) {
    console.log('Error', err);
    res.status(404).json({
      success: false,
      message: 'Unable to update',
    });
  }
};

