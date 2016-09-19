const browserSync = require('browser-sync');
const config = require('../config');
const gulp = require('gulp');
const kss = require('kss');
const path = require('path');

const dist = config.paths.dist;
const names = config.paths.names;
const styleguide = config.paths.styleguide;

const styleguideOptions = {
    source: [
        styleguide.source
    ],
    destination: styleguide.destination,
    template: styleguide.template,

    // The css and js paths are URLs, like '/misc/jquery.js'.
    // The following paths are relative to the generated style guide.
    css: [
        path.relative(styleguide.destination, styleguide.css)
    ],
    // TODO: copyCss doesn't work
    // copyCss: true
    js: []
};

// kss-node 2.3.1 and later.
gulp.task('styleguide', () => {
    kss(styleguideOptions, () => {
        browserSync.reload();
    });
});
