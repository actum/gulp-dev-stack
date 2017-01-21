const argv = require('yargs').argv;
const package = require('../package.json');
const gutil = require('gulp-util');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const isDevelopment = argv.dev || false;
const isApi = argv.api || false;

// check the minimal supported version of node
function check() {
    const nodeMajorVersion = process.version.substr(1, 1);
    const minMajorVersion = package.engines.node.substr(-1);

    if (nodeMajorVersion < minMajorVersion) {
        gutil.log(
            gutil.colors.red(`Node version ${package.engines.node} is required.`),
            gutil.colors.cyan(`You are using ${process.version}`)
        );
        process.exit(1);
    }
}

module.exports = {
    type: isDevelopment ? DEVELOPMENT : PRODUCTION,
    isDevelopment,
    isProduction: !isDevelopment,
    isApi,
    check
};
