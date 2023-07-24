const config = require('config');


const databaseConnections = {
  development: config.development.database,
  staging: config.staging.database,
  uat: config.uat.database,
  local: config.local.database,
  ivsmlegacy:config.ivsmlegacy.database,
  ivsmlegacyCRM:config.ivsmlegacyCRM.database,
  ivsmlegacyGlobal:config.ivsmlegacyGlobal,
  ibmDDGS:config.ibmDDGS
};


module.exports = databaseConnections;

