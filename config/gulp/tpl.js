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
    BUILD_DIR,
    CSS,
    GFX,
    CLIENT,
    SVG,
    TEMPLATES
} from '../../config';

/* Environments */
const DEVELOPMENT = environment.is('development');
const PRODUCTION = !DEVELOPMENT;
const Environment = nunj.Environment;
const FileSystemLoader = nunj.FileSystemLoader;

function getPagesList() {
    return glob.sync(TEMPLATES.SRC_PAGES)
        .map(pathname => pathname.replace(/\.[^.]+$/, '').substring(pathname.lastIndexOf('/') + 1, pathname.length - 1))
        .filter(name => name !== 'index');
}

gulp.task('tpl:compile', () => {
    const data = {
        _dev: DEVELOPMENT,
        _pages: getPagesList()
    };
    const searchPaths = [TEMPLATES.SRC_DIR, SVG.BUILD_DIR];
    const options = {
        noCache: true
    };

    const env = new Environment(
        new FileSystemLoader(searchPaths, options)
    );

    env.addGlobal('_cssPath', CSS.TEMPLATES_DIR);
    env.addGlobal('_jsPath', CLIENT.TEMPLATE_DIR);
    env.addGlobal('_gfxPath', GFX.TEMPLATE_DIR);
    env.addGlobal('_svgPath', SVG.SINGLE.TEMPLATE_DIR);
    env.addGlobal('_svgSpritesPath', SVG.SPRITES.TEMPLATE_DIR);

    return gulp.src(TEMPLATES.SRC_PAGES)
        // Temporary fix for gulp's error handling within streams, see https://github.com/actum/gulp-dev-stack/issues/7#issuecomment-152490084
        .pipe(plumber({
            errorHandler: e => gutil.log(gutil.colors.red(`${e.name} in ${e.plugin}: ${e.message}`))
        }))
        // https://mozilla.github.io/nunjucks/api.html#filesystemloader
        .pipe(nunjucks.compile(data, { env }))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(gulpif(PRODUCTION, prettify()))
        .pipe(gulp.dest(BUILD_DIR))
        .pipe(browserSync.stream({ once: true }));
});

gulp.task('tpl', ['tpl:compile'], (done) => {
    browserSync.reload();
    done();
});
