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
import gulpicon from 'gulpicon/tasks/gulpicon';
import svgmin from 'gulp-svgmin';
import del from 'del';
import eslint from 'gulp-eslint';
import prettify from 'gulp-prettify';
import {copy as copyToClipboard} from 'copy-paste';

// const projectName = require('./package.json').name;
const isDev = argv.dev || false;

// todo dist paths
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

const browserlist = ['last 1 version'];
const reloadStream = () => browserSync.reload({ stream: true });
const eslintDevRules = {
    'no-empty': 0,
    'space-in-parens': 0,
    'no-unused-vars': 0
};
const bsPort = 5500;

// todo clean:dist

gulp.task('less', () => {
    let postcssPlugins = [
        autoprefixer({browsers: browserlist})
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
    return gulp.src(globs)
        .pipe(eslint(isDev ? eslintDevRules : {}))
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
gulp.task('js', () => bundleify('app.js'));

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

// gulp.task('icons:clean', () => del([`${gfxPath}/svgo/*.svg`]));
// // todo move this into icons task when gulpicon supports streaming
// gulp.task('icons:minify', ['icons:clean'], () => {
//     return gulp.src(`${gfxPath}/svg/*.svg`)
//         .pipe(svgmin())
//         .pipe(gulp.dest(`${gfxPath}/svgo`));
// });
// // todo add reload when gulpicon supports streaming
// gulp.task('icons:build', ['icons:minify'], () => {
//     const opts = {
//         dest: `${gfxPath}/ico`,
//         enhanceSVG: true,
//         colors: {
//             orange: '#ed3d25'
//         }
//     };
//     return gulpicon(glob.sync(`${gfxPath}/svgo/*.svg`), opts);
// });
// gulp.task('icons', () => runSequence('icons:clean', 'icons:minify', 'icons:build'));

// todo use in dist task
gulp.task('prettify', () => {
    return gulp.src(`${srcPath}/*.html`)
        .pipe(prettify())
        .pipe(gulp.dest(srcPath));
});

gulp.task('prepare', () => runSequence(['less', 'lint', /*'icons',*/ 'swig'], 'js'));

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

// tasks
gulp.task('build', ['less', 'js', /*'icons',*/ 'swig']);

// aliases
gulp.task('default', ['serve']);
gulp.task('css', ['less']);
gulp.task('tpl', ['swig']);
