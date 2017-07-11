import gulp from 'gulp';
import gulpif from 'gulp-if';
import merge from 'merge-stream';
import browserSync from 'browser-sync';
import environment from '../environment';
import { CSS_BUILD, GFX_BUILD, JS_BUILD, STYLEGUIDE_DEST } from '../../config';

gulp.task('copySgAssets', () => {
    const css = gulp.src(`${CSS_BUILD}/*`)
        .pipe(gulp.dest(`${STYLEGUIDE_DEST}/css`))
        .pipe(gulpif(environment.is('development'), browserSync.stream()));

    const js = gulp.src(`${JS_BUILD}/*`)
        .pipe(gulp.dest(`${STYLEGUIDE_DEST}/js`));

    const gfx = gulp.src(`${GFX_BUILD}/**/*`)
        .pipe(gulp.dest(`${STYLEGUIDE_DEST}/gfx`));

    return merge(css, js, gfx);
});
