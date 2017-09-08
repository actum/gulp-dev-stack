import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import { getConfig } from '../webpack/webpack.utils';

/**
 * Bundle.
 * @description Perform Webpack build with the provided options.
 * @param {Object} options
 *  @prop {String} config Target configuration name.
 * @param {Function} done Gulp's task callback function.
 */
function bundle({ config: name }, done) {
    webpack(getConfig({ name }), (fatalError, stats) => {
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
gulp.task('app:bundle', ['clean:app'], done => bundle({ config: 'app' }, done));
gulp.task('vendor:bundle', ['clean:vendor'], done => bundle({ config: 'vendor' }, done));
