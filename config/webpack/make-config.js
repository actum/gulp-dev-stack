import merge from 'webpack-merge';
import defaultConfig from './presets';

/**
 * Make configuration
 * @param {Object} options Custom configuration maker options.
 *  @prop {String} target Target configuration basename.
 * @return {Object} Composed Webpack configuration.
 */
export function makeConfig({ target }) {
    /* Get target configuration dynamically */
    const presets = require('./presets');
    const targetConfig = presets[target];

    if (!targetConfig) {
        throw new Error(`Cannot make Webpack configuration for target "${target}". No target configuration found.`);
    }

    if (targetConfig) {
        /* Merge with the default configuration */
        const config = merge.smartStrategy({
            plugins: 'prepend',
            'module.rules': 'prepend'
        })(defaultConfig, targetConfig);

        return config;
    }
}
