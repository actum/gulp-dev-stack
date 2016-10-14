const gulp = require('gulp');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const eslint = require('gulp-eslint');
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
gulp.task('eslint:app', () => lint(src.app.all));
gulp.task('eslint:gulpfile', () => lint([gulpfile.entry, gulpfile.rest]));

gulp.task('eslint', ['eslint:gulpfile', 'eslint:app']);
