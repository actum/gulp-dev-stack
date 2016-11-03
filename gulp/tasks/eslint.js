/* Environment */
const environment = require('../environment')
const DEVELOPMENT = environment.isDevelopment;
const PRODUCTION = !DEVELOPMENT;

/* Plugins */
const gulp = require('gulp');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const eslint = require('gulp-eslint');
const config = require('../config');
const eslintConfig = require('eslint-config-actum').getConfig({ environment });

/* Plugins */
// const { gulpfile, src } = config.paths;
const gulpfile = config.paths.gulpfile;
const src = config.paths.src;

const lint = (globs) => {
    const options = { configFile: eslintConfig };

    return gulp.src(globs)
        .pipe(eslint(options))
        .pipe(eslint.format())
        .pipe(gulpif(PRODUCTION, eslint.failOnError()));
};

gulp.task('eslint:app', () => lint(src.app.all));
gulp.task('eslint:gulpfile', () => lint([gulpfile.entry, gulpfile.rest]));

gulp.task('eslint', ['eslint:gulpfile', 'eslint:app']);
