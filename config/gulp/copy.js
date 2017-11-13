import gulp from 'gulp';
import gulpif from 'gulp-if';
import merge from 'merge-stream';
import browserSync from 'browser-sync';
import environment from '../environment';
import { CSS, GFX, CLIENT, STYLEGUIDE } from '../../config';

gulp.task('copySgAssets', () => {
    const css = gulp.src(`${CSS.BUILD_DIR}/*`)
        .pipe(gulp.dest(`${STYLEGUIDE.BUILD_DIR}/css`))
        .pipe(gulpif(environment.is('development'), browserSync.stream()));

    const js = gulp.src(`${CLIENT.BUILD_DIR}/*`)
        .pipe(gulp.dest(`${STYLEGUIDE.BUILD_DIR}/js`));

    const gfx = gulp.src(`${GFX.BUILD_DIR}/**/*`)
        .pipe(gulp.dest(`${STYLEGUIDE.BUILD_DIR}/gfx`));

    return merge(css, js, gfx);
});
