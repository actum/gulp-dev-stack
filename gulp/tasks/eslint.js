const config = require('../config');
const environment = config.environment;
const PRODUCTION = !environment.isDevelopment;
const gulp = require('gulp');
const gulpif = require('gulp-if');
const eslint = require('gulp-eslint');
const cached = require('gulp-cached');
const eslintConfig = require('eslint-config-actum').getConfig({ environment });

const lint = (globs) => {
    const options = {
        configFile: eslintConfig
    };

    return gulp.src(globs)
        .pipe(cached('eslint'))
        .pipe(eslint(options))
        .pipe(eslint.format())
        .pipe(gulpif(PRODUCTION, eslint.failOnError()));
};

gulp.task('eslint:app', () => lint(config.JS_ALL));

gulp.task('eslint', ['eslint:app']);
