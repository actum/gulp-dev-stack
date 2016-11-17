const argv = require('yargs').argv;
const DEVELOPMENT = 'DEVELOPMENT';
const PRODUCTION = 'PRODUCTION';
const isDevelopment = argv.dev || false;
const isApi = argv.api || false;

module.exports = {
    type: isDevelopment ? DEVELOPMENT : PRODUCTION,
    isDevelopment,
    isProduction: !isDevelopment,
    isApi
};
