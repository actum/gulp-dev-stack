import gulp from 'gulp';
import {argv} from 'yargs';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import swig from 'gulp-swig';
import combiner from 'stream-combiner2';
import less from 'gulp-less';
import lessPluginGlob from 'less-plugin-glob';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import runSequence from 'run-sequence';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import glob from 'glob';
import del from 'del';
import eslint from 'gulp-eslint';
import prettify from 'gulp-prettify';
import {copy as copyToClipboard} from 'copy-paste';

const isDev = argv.dev || false;

const srcPath = './src';
const bowerPath = `${srcPath}/bower`;
const lessPath = `${srcPath}/less`;
const cssPath = `${srcPath}/css`;
const appPath = `${srcPath}/app`;
const appFiles = `${appPath}/**/*.js`;
const jsPath = `${srcPath}/js`;
const tplPath = `${srcPath}/tpl`;
const gfxPath = `${srcPath}/gfx`;
const distPath = './dist';
const distCssPath = `${distPath}/css`;
const distJsPath = `${distPath}/js`;
const gulpfile = './gulpfile.babel.js';

const reloadStream = () => browserSync.reload({ stream: true });
const bsPort = 5500;

// todo clean:dist

gulp.task('less', () => {
    let postcssPlugins = [
        autoprefixer({browsers: ['last 1 version']})
    ];
    let postcssAfterPlugins = [
        cssnano()
    ];
    let combined = combiner.obj([
        gulp.src(`${lessPath}/main.less`),
        sourcemaps.init(),
        less({
            paths: [lessPath, bowerPath],
            plugins: [lessPluginGlob]
        }),
        postcss(postcssPlugins),
        gulpif(isDev, sourcemaps.write()),
        rename('style.css'),
        gulp.dest(isDev ? cssPath : distCssPath),
        gulpif(isDev, reloadStream()),
        gulpif(!isDev, postcss(postcssAfterPlugins)),
        gulpif(!isDev, rename('style.min.css')),
        gulpif(!isDev, gulp.dest(distCssPath))
    ]);
    combined.on('error', gutil.log);
    
    return combined;
});

const lint = (globs) => {
    const config = isDev ? {
        'rules': {
            'no-empty': 0,
            'space-in-parens': 0,
            'no-unused-vars': 0,
            'no-multiple-empty-lines': 0
        }
    } : {};
    return gulp.src(globs)
        .pipe(eslint(config))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
};
gulp.task('lint:app', () => lint(appFiles));
gulp.task('lint:gulpfile', () => lint(gulpfile));
gulp.task('lint', ['lint:gulpfile', 'lint:app']);

const bundleify = (filename) => {
    const opts = {
        entries: `${appPath}/${filename}`,
        debug: isDev,
        transform: [babelify]
    };
    const bundler = isDev ? watchify(browserify(Object.assign({}, watchify.args, opts))) : browserify(opts);
    const rebundle = () => {
        return bundler.bundle()
            .on('error', gutil.log)
            .pipe(source(filename))
            .pipe(buffer())
            .pipe(rename('app-compiled.js'))
            .pipe(gulp.dest(isDev ? jsPath : distJsPath))
            .pipe(gulpif(isDev, reloadStream()))
            .pipe(gulpif(!isDev, uglify()))
            .pipe(gulpif(!isDev, rename('app-compiled.min.js')))
            .pipe(gulpif(!isDev, gulp.dest(distJsPath)));
    };
    bundler
        .on('update', rebundle)
        .on('log', gutil.log);
    return rebundle();
};
gulp.task('js', ['lint'], () => bundleify('app.js'));

gulp.task('swig', () => {
    let opts = {
        defaults: { cache: false },
        data: {
            '_dev': isDev,
            '_pages': (() => {
                return glob.sync(`${tplPath}/*.swig`).map((pathname) => {
                    return pathname.replace(/\.[^\.]+$/, '').substring(pathname.lastIndexOf('/') + 1, pathname.length - 1);
                });
            })()
        }
    };
    return gulp.src(`${tplPath}/*.swig`)
        .pipe(swig(opts))
        .on('error', gutil.log)
        .pipe(gulp.dest(isDev ? srcPath : distPath))
        .pipe(reloadStream());
});

gulp.task('prettify', () => {
    return gulp.src(`${srcPath}/*.html`)
        .pipe(prettify())
        .pipe(gulp.dest(srcPath));
});

// lets use 'prepare' task for both dev and prod so we can use production build sequence for both build task and prod serve task
// before this change, we've been using dev 'prepare' in prod serve task…
const devSequence = [['less', 'js', 'swig']];
const buildSequence = [['less', 'js', 'swig'], 'prettify'];
const prepareSequence = isDev ? devSequence : buildSequence;
gulp.task('prepare', () => runSequence(...prepareSequence));

gulp.task('serve', ['prepare'], () => {
    browserSync({
        port: bsPort,
        server: isDev ? srcPath : distPath,
        open: false
    }, () => copyToClipboard(`localhost:${bsPort}`, () => gutil.log(gutil.colors.green('Local server address has been copied to your clipboard'))));

    if (isDev) {
        gulp.watch(`${lessPath}/**/*.less`, ['less']);
        gulp.watch(`${srcPath}/**/*.swig`, ['swig']);
        gulp.watch(appFiles, ['lint:app']);
        gulp.watch(gulpfile, ['lint:gulpfile']);
    }
});

// todo deploy (prototype)

// aliases
gulp.task('default', ['serve']);
gulp.task('build', ['prepare']);
gulp.task('css', ['less']);
gulp.task('tpl', ['swig']);
