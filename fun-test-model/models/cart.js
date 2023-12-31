'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
    Product,
    User}) {
      // define association here
      this.belongsTo(Product,{
        foreignKey: 'productId',
      });
      this.belongsTo(User,{
        foreignKey: 'user'
      });
    }
  }
  Cart.init({
    productId: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};