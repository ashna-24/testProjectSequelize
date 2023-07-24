const { createHandler } = require('@bittrance/azure-function-express');
const app = require('../fun-testService/index');

module.exports =  createHandler(app);
