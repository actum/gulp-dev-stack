import gulp from 'gulp';
import kss from 'kss';
import browserSync from 'browser-sync';
import { CSS_BASE, STYLEGUIDE_DEST, STYLEGUIDE_TEMPLATE, STYLEGUIDE_HOMEPAGE } from '../../config';

const styleguideOptions = {
    source: CSS_BASE,
    destination: STYLEGUIDE_DEST,
    template: STYLEGUIDE_TEMPLATE,
    homepage: STYLEGUIDE_HOMEPAGE,
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
