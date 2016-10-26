/* Environment */
const config = require('../config');
const environment = config.environment;
const DEVELOPMENT = environment.isDevelopment;
const PRODUCTION = !DEVELOPMENT;

/* Gulp */
const gulp = require('gulp');
const gulpif = require('gulp-if');
const eslint = require('gulp-eslint');
const eslintConfig = require('eslint-config-actum').getConfig({ environment });

const lint = (globs) => {
    const options = {
        configFile: eslintConfig
    };

    return gulp.src(globs)
        .pipe(eslint(options))
        .pipe(eslint.format())
        .pipe(gulpif(PRODUCTION, eslint.failOnError()));
};

gulp.task('eslint:gulpfile', () => lint(config.GULP_ALL));

gulp.task('eslint', ['eslint:gulpfile']);
