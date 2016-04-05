import gulp from 'gulp';
import { argv } from 'yargs';
import del from 'del';
import config from '../config';

const {
    src: { styles, app, icon, html },
    dist
} = config.paths;
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
