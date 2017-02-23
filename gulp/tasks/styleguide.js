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
        'css/main.css',
        'https://fonts.googleapis.com/css?family=Roboto:400,700:latin'
    ],
    js: [
        'js/app.js'
    ]
};

gulp.task('styleguide', (cb) => {
    kss(styleguideOptions, cb);
});
