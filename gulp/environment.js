const argv = require('yargs').argv;

/* Types */
const DEVELOPMENT = 'DEVELOPMENT';
const PRODUCTION = 'PRODUCTION';

/* Define */
const isDevelopment = argv.dev || false;

module.exports = {
    name: isDevelopment ? DEVELOPMENT : PRODUCTION,
    isDevelopment,
    isProduction: !isDevelopment
};
