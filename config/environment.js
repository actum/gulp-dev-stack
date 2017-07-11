import { argv } from 'yargs';
import gutil from 'gulp-util';
import packageJson from '../package.json';

/* Available environments */
export const envs = {
    development: 'development',
    production: 'production'
};

export const isApi = !!argv.api;

/* Check the minimal supported version of node */
export function checkNodeVersion() {
    const nodeMajorVersion = process.version.substr(1, 1);
    const minMajorVersion = packageJson.engines.node.substr(-1);

    if (nodeMajorVersion < minMajorVersion) {
        gutil.log(
            gutil.colors.red(`Node version ${packageJson.engines.node} is required.`),
            gutil.colors.cyan(`You are using ${process.version}`)
        );
        process.exit(1);
    }
}

/* Define current environment based on CI arguments */
export function define() {
    const isDevelopment = !!argv.dev;
    const currentEnvironment = isDevelopment ? envs.development : envs.production;
    process.env.NODE_ENV = currentEnvironment;

    return currentEnvironment;
}

/**
 * Is
 * @description Shorthand method to determine if current environment equals the expected one.
 * @param {String} expectedEnv
 * @return {Boolean}
 */
export function is(expectedEnv) {
    return (process.env.NODE_ENV === expectedEnv);
}

export default {
    checkNodeVersion,
    define,
    is
};
