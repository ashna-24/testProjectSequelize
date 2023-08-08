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
    await Cart.sequelize.query(`EXEC AddToCart @productId=:productId, @user=:user, @quantity=:quantity`,
      {
        replacements: { productId:productId, user:user, quantity:quantity },
        type: sequelize.QueryTypes.SELECT
      },
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