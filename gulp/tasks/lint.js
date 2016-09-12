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
    const opts = isDev ? {
        'rules': {
            'no-empty': 0,
            'space-in-parens': 0,
            'no-unused-vars': 0,
            'no-multiple-empty-lines': 0
        }
    } : {};
    return gulp.src(globs)
        .pipe(eslint(opts))
        .pipe(eslint.format())
        .pipe(gulpif(!isDev, eslint.failOnError()));
};
gulp.task('lint:app', () => lint(src.app.all));
gulp.task('lint:gulpfile', () => lint([gulpfile.entry, gulpfile.rest]));

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
