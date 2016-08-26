const gulp = require('gulp');
const argv = require('yargs').argv;
const del = require('del');
const config = require('../config');

// const {
//     src: { styles, app, icon, html },
//     dist
// } = config.paths;
const styles = config.paths.src.styles;
const app = config.paths.src.app;
const icon = config.paths.src.icon;
const html = config.paths.src.html;
const dist = config.paths.dist;

const srcDest = [styles.dest, app.dest, icon.dest, html];
const distDest = dist.base;
const isDev = argv.dev || false;

/**
 * Removes either /dist or all built targets in /src
 * Based on --dev param
 * Used in `prepare` pipeline
 */
gulp.task('clean', () => del(isDev ? srcDest : distDest));

/**
 * Removes /dist and all built targets in /src
 * Use standalone as `gulp unbuild`
 */
gulp.task('unbuild', () => del([...srcDest, distDest]));
