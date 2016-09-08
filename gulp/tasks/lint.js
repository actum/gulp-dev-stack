const gulp = require('gulp');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const eslint = require('gulp-eslint');
const gulpStylelint = require('gulp-stylelint');
const config = require('../config');

// const { gulpfile, src } = config.paths;
const gulpfile = config.paths.gulpfile;
const src = config.paths.src;
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
