const argv = require('yargs').argv;

/* Types */
const DEVELOPMENT = 'DEVELOPMENT';
const PRODUCTION = 'PRODUCTION';

/* Declare */
const isDevelopment = argv.dev || false;

module.exports = {
    type: isDevelopment ? DEVELOPMENT : PRODUCTION,
    isDevelopment,
    isProduction: !isDevelopment
};
