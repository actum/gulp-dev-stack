import gulp from 'gulp';
import { argv } from 'yargs';
import gulpif from 'gulp-if';
import eslint from 'gulp-eslint';
import config from '../config';
const gulpStylelint = require('gulp-stylelint');

const { gulpfile, src } = config.paths;
const isDev = argv.dev || false;

const lint = (globs) => {
    return gulp.src(globs)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(gulpif(!isDev, eslint.failOnError()));
};
gulp.task('lint:app', () => lint(src.app.all));
gulp.task('lint:gulpfile', () => lint(gulpfile));

gulp.task('lint:styles', () => {
    return gulp
        .src(src.styles.all)
        .pipe(gulpStylelint({
            failAfterError: false,
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));
});
gulp.task('lint', ['lint:gulpfile', 'lint:app', 'lint:styles']);
