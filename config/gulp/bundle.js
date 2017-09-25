import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackAppConfig from '../webpack/presets/app.babel';
import webpackVendorConfig from '../webpack/presets/vendor.babel';

/**
 * Bundle.
 * @description Perform Webpack build with the provided options.
 * @param {Object} config webpack configuration Object.
 * @param {Function} done Gulp's task callback function.
 */
function bundle(config, done) {
    webpack(config, (fatalError, stats) => {
        if (fatalError) {
            throw new gutil.PluginError('webpack', fatalError);
        }

        const jsonStats = stats.toJson();
        const buildError = jsonStats.errors[0];

        if (buildError) {
            throw new gutil.PluginError('webpack', buildError);
        }

        gutil.log('[webpack]', stats.toString({
            colors: true,
            version: true,
            hash: false,
            chunks: false,
            chunkModules: false
        }));

        return done();
    });
}

/* Bundle tasks */
gulp.task('app:bundle', ['clean:app'], done => bundle(webpackAppConfig, done));
gulp.task('vendor:bundle', ['clean:vendor'], done => bundle(webpackVendorConfig, done));
