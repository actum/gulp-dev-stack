import glob from 'glob';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import nunj from 'nunjucks';
import nunjucks from 'gulp-nunjucks';
import prettify from 'gulp-prettify';
import environment from '../environment';
import {
    BUILD_BASE,
    CSS_TPL_PATH,
    GFX_TPL_PATH,
    JS_TPL_PATH,
    SVG_BUILD,
    SVG_TPL_PATH,
    SVG_SPRITES_TPL_PATH,
    TEMPLATE_PAGES,
    TEMPLATE_BASE
} from '../../config';

const DEVELOPMENT = environment.is('development');
const PRODUCTION = !DEVELOPMENT;

const Environment = nunj.Environment;
const FileSystemLoader = nunj.FileSystemLoader;

function getPagesList() {
    return glob.sync(TEMPLATE_PAGES)
        .map(pathname => pathname.replace(/\.[^.]+$/, '').substring(pathname.lastIndexOf('/') + 1, pathname.length - 1))
        .filter(name => name !== 'index');
}

gulp.task('tpl', () => {
    const data = {
        _dev: DEVELOPMENT,
        _pages: getPagesList()
    };
    const searchPaths = [TEMPLATE_BASE, SVG_BUILD];
    const options = {
        noCache: true
    };
    const env = new Environment(
        new FileSystemLoader(searchPaths, options)
    );
    env.addGlobal('_cssPath', CSS_TPL_PATH);
    env.addGlobal('_jsPath', JS_TPL_PATH);
    env.addGlobal('_gfxPath', GFX_TPL_PATH);
    env.addGlobal('_svgPath', SVG_TPL_PATH);
    env.addGlobal('_svgSpritesPath', SVG_SPRITES_TPL_PATH);

    return gulp.src(TEMPLATE_PAGES)
        // Temporary fix for gulp's error handling within streams, see https://github.com/actum/gulp-dev-stack/issues/7#issuecomment-152490084
        .pipe(plumber({
            errorHandler: e => gutil.log(gutil.colors.red(`${e.name} in ${e.plugin}: ${e.message}`))
        }))
        // https://mozilla.github.io/nunjucks/api.html#filesystemloader
        .pipe(nunjucks.compile(data, { env }))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(gulpif(PRODUCTION, prettify()))
        .pipe(gulp.dest(BUILD_BASE))
        .pipe(browserSync.stream({ once: true }));
});
