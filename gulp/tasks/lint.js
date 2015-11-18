import gulp from 'gulp';
import { argv } from 'yargs';
import gulpif from 'gulp-if';
import eslint from 'gulp-eslint';
import config from '../config';

const { gulpfile, src } = config.paths;
const isDev = argv.dev || false;

const lint = (globs) => {
    const opts = isDev ? {
        'rules': {
            'no-empty': 0,
            'space-in-parens': 0,
            'no-unused-vars': 0,
            'no-multiple-empty-lines': 0
        }
    } : {};
    return gulp.src(globs)
        .pipe(eslint(opts))
        .pipe(eslint.format())
        .pipe(gulpif(!isDev, eslint.failOnError()));
};
gulp.task('lint:app', () => lint(src.app.all));
gulp.task('lint:gulpfile', () => lint(gulpfile));
gulp.task('lint', ['lint:gulpfile', 'lint:app']);