import { resolve } from 'path';
import webpackMerge from 'webpack-merge';

const CWD = process.cwd();

/* Shorthand: Absolute path */
export const absolutePath = (...relativePaths) => {
    return resolve(CWD, ...relativePaths);
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
