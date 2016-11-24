// check the minimal supported version of node
const pkg = require('./package.json');
const gutil = require('gulp-util');

const nodeMajorVersion = process.version.substr(1, 1);
const minMajorVersion = pkg.engines.node.substr(-1);

if (nodeMajorVersion < minMajorVersion) {
    gutil.log(
        gutil.colors.red(`Node version ${pkg.engines.node} is required.`),
        gutil.colors.cyan(`You are using ${process.version}`)
    );
    process.exit(1);
}

const config = require('./gulp/config');
process.env.NODE_ENV = config.environment.type;
const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp/tasks');

/* API */
gulp.task('default', ['serve']);
gulp.task('build', ['prepare']);
gulp.task('css', ['less']);
