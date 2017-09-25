/**
 * Default webpack configuration.
 */
import { mergeParts } from '../webpack.utils';

export default mergeParts([
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
