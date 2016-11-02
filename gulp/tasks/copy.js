var gulp = require('gulp');
var merge = require('merge-stream');
var config = require('../config');

const dist = config.paths.dist;
const styleguide = config.paths.styleguide;

gulp.task('copySgAssets', () => {
    const css = gulp.src(dist.css + '/*')
        .pipe(gulp.dest(styleguide.destination + '/css'));

    const js = gulp.src(dist.js + '/*')
        .pipe(gulp.dest(styleguide.destination + '/js'));

    const gfx = gulp.src(dist.gfx + '/**/*')
        .pipe(gulp.dest(styleguide.destination + '/gfx'));

    return merge(css, js, gfx);
});
