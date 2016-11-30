const config = require('../config');
const browserSync = require('browser-sync');
const gulp = require('gulp');
const kss = require('kss');

const styleguideOptions = {
    source: config.CSS_BASE,
    destination: config.STYLEGUIDE_DEST,
    template: config.STYLEGUIDE_TEMPLATE,
    homepage: config.STYLEGUIDE_HOMEPAGE,
    custom: ['wrap'],
    // The css and js paths are URLs, like '/misc/jquery.js'.
    // The following paths are relative to the generated style guide.
    css: [
        config.STYLEGUIDE_CSS
    ],
    js: [
        config.STYLEGUIDE_JS
    ]
};

gulp.task('styleguide', (cb) => {
    kss(styleguideOptions, cb);
});
