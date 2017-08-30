/**
 * Default webpack configuration.
 */
import { merge } from '../utils';

export default merge([
    {
        entry: '',
        output: {
            path: '',
            filename: ''
        }
    },

    /**
     * Include custom resolvers for ESLint webpack-import-resolver.
     * This will allow ESLint to understand the aliases you provide in webpack.
     */
    resolvers()
]);
