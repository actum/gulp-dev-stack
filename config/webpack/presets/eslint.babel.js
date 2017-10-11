/**
 * Default webpack configuration.
 */
import { mergeParts } from '../webpack.utils';
import { resolvers } from '../webpack.parts';

export default mergeParts([
    {
        entry: '',
        output: {
            path: '',
            filename: ''
        }
    },

    /**
     * Include common resolvers for ESLint's webpack-import-resolver.
     * This allows you to use webpack resolve aliases without eslint
     * screaming at you.
     */
    resolvers()
]);
