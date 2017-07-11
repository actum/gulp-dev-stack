import gulp from 'gulp';
import stylelint from 'gulp-stylelint';
import cached from 'gulp-cached';
import environment from '../environment';
import { CSS_ALL } from '../../config';

gulp.task('stylelint', () => {
    return gulp
        .src(CSS_ALL)
        .pipe(cached('stylelint'))
        .pipe(stylelint({
            failAfterError: environment.is('production'),
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));
});
