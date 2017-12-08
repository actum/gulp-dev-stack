/**
 * Webpack parts.
 * Independent reusable parts of webpack configuration.
 */
import { resolve } from 'path';

/* Shorthands */
const CWD = process.cwd();
const PRODUCTION = (process.env.NODE_ENV === 'production');

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
 * @summary Processor is an independant unit of webpack configuration responsible
 * for processing one dedicated format of files.
 */
export const processors = {
  /* JavaScript */
  js: ({ include, exclude = /node_modules/ }) => ({
    module: {
      rules: [
        {
          test: /.jsx?$/i,
          exclude,
          include,
          loaders: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            },
            {
              loader: 'eslint-loader',
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
        }
      ]
    }
  }),
};
