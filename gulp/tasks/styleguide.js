const browserSync = require('browser-sync');
const config = require('../config');
const gulp = require('gulp');
const kss = require('kss');
const path = require('path');

const src = config.paths.src;
const dist = config.paths.dist;
const names = config.paths.names;
const styleguide = config.paths.styleguide;

const styleguideOptions = {
    source: src.styles.base,
    destination: styleguide.destination,
    template: styleguide.template,
    homepage: styleguide.homepage,
    custom: ['wrap'],
    // The css and js paths are URLs, like '/misc/jquery.js'.
    // The following paths are relative to the generated style guide.
    css: [
        styleguide.css
    ],
    js: [
        styleguide.js
    ]
};

// kss-node 2.3.1 and later.
gulp.task('styleguide', () => {
    kss(styleguideOptions, () => {
        browserSync.reload();
    });
});
