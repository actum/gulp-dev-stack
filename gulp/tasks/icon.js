import gulp from 'gulp';
import { argv } from 'yargs';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import path from 'path';
import config from '../config';

const { src, dist } = config.paths;
const isDev = argv.dev || false;

gulp.task('icon', () => {
    return gulp.src(src.icon.entry)
        .pipe(svgmin((file) => {
            const prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(gulp.dest(isDev ? src.icon.dest : dist.icon));
        // TODO run 'tpl' task and 'browserSync' after icon task
        // to include svg.svg file into all templates
});
