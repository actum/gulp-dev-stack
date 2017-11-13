import gulp from 'gulp';
import kss from 'kss';
import browserSync from 'browser-sync';
import { CSS, STYLEGUIDE } from '../../config';

const styleguideOptions = {
    source: CSS.SRC_BASE,
    destination: STYLEGUIDE.BUILD_DIR,
    template: STYLEGUIDE.TEMPLATE_DIR,
    homepage: STYLEGUIDE.HOMEPAGE,
    custom: ['wrap'],
    // The css and js paths are URLs, like '/misc/jquery.js'.
    // The following paths are relative to the generated style guide.
    css: [
        'css/main.css', // TODO include from the config
        'https://fonts.googleapis.com/css?family=Roboto:400,700:latin'
    ],
    js: [
        'js/app.js' // TODO include from the config
    ]
};

gulp.task('styleguide', (cb) => {
    kss(styleguideOptions, cb);
});
