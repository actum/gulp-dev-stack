/* Configuration */
const config = require('../config');

/* Plugins */
const browserSync = require('browser-sync');
const gulp = require('gulp');
const kss = require('kss');
const path = require('path');

const styleguideOptions = {
    source: [
        config.STYLEGUIDE_SOURCE
    ],
    destination: config.STYLEGUIDE_DEST,
    template: config.STYLEGUIDE_TEMPLATE,

    // The css and js paths are URLs, like '/misc/jquery.js'.
    // The following paths are relative to the generated style guide.
    css: [
        path.relative(config.STYLEGUIDE_DEST, config.STYLEGUIDE_CSS)
    ],
    // TODO: copyCss doesn't work
    // copyCss: true
    js: config.STYLEGUIDE_JS
};

// kss-node 2.3.1 and later.
gulp.task('styleguide', () => {
    kss(styleguideOptions, () => {
        browserSync.reload();
    });
});
