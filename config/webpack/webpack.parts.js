/**
 * Webpack parts.
 * @description Small reusable parts of webpack configuration.
 */
import { resolve } from 'path';
import HappyPack from 'happypack';

/* Shorthands */
const CWD = process.cwd();
const PRODUCTION = (process.env.NODE_ENV === 'production');

/**
 * Handle include.
 */
function handleInclude(relativePath) {
  return relativePath && [].concat(relativePath).map(path => resolve(CWD, path));
}

/**
 * Custom resolvers.
 */
export const resolvers = (customResolvers) => ({
  resolve: {
    alias: {},
    extensions: ['./index.jsx', '.jsx', '.js'],
    ...customResolvers
  }
});

/**
 * Custom processors.
 */
export const processors = {
  /**
   * Compile JavaScript.
   */
  js: ({ include, exclude = /node_modules/ }) => ({
    plugins: [
      new HappyPack({
        id: 'js',
        threads: 6,
        verbose: false,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'eslint-loader',
            enforce: 'pre',
            options: {
              /**
               * Make sure you disable eslint cache.
               * Caching eslint results may lead to million of errors after the cache expires.
               */
              cache: false,
              failOnError: PRODUCTION
            }
          }
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /.jsx?$/i,
          exclude,
          include: handleInclude(include),
          loader: 'happypack/loader?id=js'
        }
      ]
    }
  })
};
