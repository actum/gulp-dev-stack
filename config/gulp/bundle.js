import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import { makeConfig } from '../webpack/make-config';

/**
 * Bundle.
 * @description Perform Webpack build with the provided options.
 * @param {Object} options
 *  @prop {String} target Target configuration name.
 * @param {Function} done Gulp's done callback function.
 */
function bundle({ target }, done) {
    const targetConfig = makeConfig({ target });

    webpack(targetConfig, (fatalError, stats) => {
        function throwError(error) { throw new gutil.PluginError('webpack', error); }

        const jsonStats = stats.toJson();
        const buildError = jsonStats.errors[0];
        if (buildError) throwError(buildError);

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

gulp.task('bundle/app', [], done => bundle({ target: 'app' }, done));
