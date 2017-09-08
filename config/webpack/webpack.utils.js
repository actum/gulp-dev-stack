import { resolve } from 'path';
import webpackMerge from 'webpack-merge';

const CWD = process.cwd();

/**
 * Shorthand: Absolute path
 */
export const absolutePath = (...relativePaths) => {
    return resolve(CWD, ...relativePaths);
};

/**
 * Get configuration filepath.
 */
export const getConfig = ({ name }) => {
    /* Get target configuration dynamically */
    const targetConfig = require(`./presets/${name}.babel`);

    if (targetConfig) {
        return targetConfig.default;
    } else {
        throw new Error(`Cannot make webpack configuration for target "${name}". No target configuration found.`);
    }
};

/**
 * Merge parts of webpack configuration into a single configuration.
 * @param {Array<webpackConfig>} webpackParts
 */
export const mergeParts = (...webpackParts) => {
    return webpackMerge.smartStrategy({
        plugins: 'prepend',
        module: {
            rules: 'prepend'
        }
    })(...webpackParts);
};
