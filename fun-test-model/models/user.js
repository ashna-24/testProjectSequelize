const bcrypt = require('bcrypt');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  User.beforeUpdate(async(user, options) =>{
    if(user.changed('password')){
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }

    if (user.changed('firstName')) {
      console.log('First name updated:', user.firstName);
    }
  
    if (user.changed('lastName')) {
      console.log('Last name updated:', user.lastName);
    }
  
    if (user.changed('email')) {
      console.log('Email updated:', user.email);
    }
  })

  // After hook after user is created
  User.afterCreate((user, options) => {
    console.log('User created:', user.firstName, user.lastName);
    // Additional actions after user creation
  });

  User.afterUpdate((user,options) =>{
    console.log('Updated User:', user.firstName, user.lastName, user.email, user.password);
  })
  return User;
};