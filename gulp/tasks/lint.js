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

/* Rule set for different environments */
const devRules = {
    /* Visuals */
    "semi": 2,
    "indent": [2, 4],
    "max-len": 0,
    "no-multiple-empty-lines": [2, { "max": 1}],
    "space-before-function-paren": 0,
    "padded-blocks": 0,

    "quotes": [2, "single"],
    "strict": [2, "never"],

    "one-var": [2, "never"],

    "no-alert": 0,
    "no-console": 0,
    "no-tabs": 2,
    "no-param-reassign": [2, { "props": false }],
    "no-unused-vars": 0,

    /* Import */
    "import/imports-first": 2,
    "import/newline-after-import": 1,
    "import/no-extraneous-dependencies": 1,

    "no-new-object": 2,
    "object-shorthand": 2,
    "quote-props": 2,
}

const lint = (globs) => {
    const rules = isDev ? devRules : {};

    return gulp.src(globs)
        .pipe(eslint({ rules }))
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
