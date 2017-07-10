const argv = require('yargs').argv;
const gutil = require('gulp-util');
const package = require('../package.json');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

/* Check the minimal supported version of node */
function checkNodeVersion() {
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

/* Define current environment based on CI arguments */
function define() {
    const isDevelopment = !!argv.dev;
    const currentEnvironment = isDevelopment ? DEVELOPMENT : PRODUCTION;
    process.env.NODE_ENV = currentEnvironment;

    return currentEnvironment;
}

function is(expectedEnv) {
    return (process.env.NODE_ENV === expectedEnv);
}

module.exports = {
    isApi: !!argv.api,
    checkNodeVersion,
    define,
    is
};
