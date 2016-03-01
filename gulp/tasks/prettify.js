import gulp from 'gulp';
import prettify from 'gulp-prettify';
import config from '../config';

const { src, dist } = config.paths;

gulp.task('prettify', () => {
    return gulp.src(isDev ? src.html : dist.html)
        .pipe(prettify())
        .pipe(gulp.dest(isDev ? src.base : dist.base));
});
