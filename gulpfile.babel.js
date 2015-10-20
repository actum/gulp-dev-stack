import gulp from 'gulp';
import {argv} from 'yargs';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import swig from 'gulp-swig';
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
import gutil from 'gulp-util';
import glob from 'glob';
import gulpicon from 'gulpicon/tasks/gulpicon';
import svgmin from 'gulp-svgmin';
import del from 'del';
import eslint from 'gulp-eslint';
import prettify from 'gulp-prettify';
import {copy as copyToClipboard} from 'copy-paste';

// const projectName = require('./package.json').name;
let isDev = argv.dev || false;

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
const gulpfile = './gulpfile.babel.js';

const browserlist = ['last 1 version'];
const reloadStream = () => browserSync.reload({ stream: true });
const eslintDevRules = {
    'no-empty': 0,
    'space-in-parens': 0,
    'no-unused-vars': 0
};
const eslintEcmaFeatures = {
    'jsx': true,
    'modules': true,
    'arrowFunctions': true,
    'spread': true,
    'templateStrings': true,
    'blockBindings': true
};
const bsPort = 5500;

// todo clean:dist

// todo less:dist (csso)
gulp.task('less', () => {
    let postcssPlugins = [
        autoprefixer({browsers: browserlist})
    ];
    if (!isDev) {
        postcssPlugins.push(cssnano());
    }
    return gulp.src(`${lessPath}/main.less`)
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [lessPath, bowerPath],
            plugins: [lessPluginGlob]
        }))
        .on('error', gutil.log)
        .pipe(postcss(postcssPlugins))
        .pipe(gulpif(isDev, sourcemaps.write()))
        .pipe(gulp.dest(isDev ? cssPath : distCssPath))
        .pipe(gulpif(isDev, reloadStream()));
});

// try yargs (--dev or default prod)
const lint = (globs, dev = false, babel = false) => {
    const config = {
        rules: dev ? eslintDevRules : {},
        ecmaFeatures: babel ? eslintEcmaFeatures : {}
    };
    return gulp.src(globs)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
};
gulp.task('lint:app', () => lint(appFiles, true));
gulp.task('lint:gulpfile', () => lint(gulpfile, true, true));
gulp.task('lint', ['lint:gulpfile', 'lint:app']);
gulp.task('lint:dist', () => lint([appFiles, gulpfile]));

const bundleify = (filename, dev = false) => {
    const opts = {
        entries: `${appPath}/${filename}`,
        debug: dev,
        // transform: [babelify]
    };
    const bundler = dev ? watchify(browserify(Object.assign({}, watchify.args, opts))) : browserify(opts);
    const rebundle = () => {
        return bundler.bundle()
            .on('error', gutil.log)
            .pipe(source(filename))
            .pipe(gulp.dest(jsPath))
            .pipe(dev ? reloadStream() : gutil.noop());
    };
    bundler
        .on('update', rebundle)
        .on('log', gutil.log);
    return rebundle();
};
// copy non-minified version even to dist (debug)
gulp.task('js', () => bundleify('app.js', true));
gulp.task('js:dist', () => bundleify('app.js'));
// todo uglify dist

gulp.task('swig', () => {
    const opts = {
        defaults: { cache: false },
        data: {
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

gulp.task('icons:clean', () => del([`${gfxPath}/svgo/*.svg`]));
// todo move this into icons task when gulpicon supports streaming
gulp.task('icons:minify', ['icons:clean'], () => {
    return gulp.src(`${gfxPath}/svg/*.svg`)
        .pipe(svgmin())
        .pipe(gulp.dest(`${gfxPath}/svgo`));
});
// todo add reload when gulpicon supports streaming
gulp.task('icons:build', ['icons:minify'], () => {
    const opts = {
        dest: `${gfxPath}/ico`,
        enhanceSVG: true,
        colors: {
            orange: '#ed3d25'
        }
    };
    return gulpicon(glob.sync(`${gfxPath}/svgo/*.svg`), opts);
});
gulp.task('icons', () => runSequence('icons:clean', 'icons:minify', 'icons:build'));

// todo use in dist task
gulp.task('prettify', () => {
    return gulp.src(`${srcPath}/*.html`)
        .pipe(prettify())
        .pipe(gulp.dest(srcPath));
});

gulp.task('prepare', () => runSequence('icons', 'lint', 'js', ['less', 'swig']));

gulp.task('serve', ['prepare'], () => {
    isDev = true;

    browserSync({
        port: bsPort,
        server: srcPath,
        open: false
    }, () => copyToClipboard(`localhost:${bsPort}`, () => gutil.log(gutil.colors.green('Local server address has been copied to your clipboard'))));

    gulp.watch(`${lessPath}/**/*.less`, ['less']);
    gulp.watch(`${srcPath}/**/*.swig`, ['swig']);
    gulp.watch(appFiles, ['lint:app']);
    gulp.watch(gulpfile, ['lint:gulpfile']);
});

// todo dist build

// todo deploy (prototype)

// aliases
gulp.task('default', ['serve']);
gulp.task('css', ['less']);
gulp.task('tpl', ['swig']);
