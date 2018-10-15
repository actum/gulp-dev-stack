const glob = require('glob');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const nunj = require('nunjucks');
const nunjucks = require('gulp-nunjucks');
const prettify = require('gulp-prettify');
const htmlValidator = require('gulp-w3cjs');

const config = require('../config');

const DEVELOPMENT = config.environment.isDevelopment;
const PRODUCTION = !DEVELOPMENT;
const Environment = nunj.Environment;
const FileSystemLoader = nunj.FileSystemLoader;

function getPagesList() {
  return glob
    .sync(config.TEMPLATE_PAGES)
    .map((pathname) =>
      pathname
        .replace(/\.[^.]+$/, '')
        .substring(pathname.lastIndexOf('/') + 1, pathname.length - 1),
    )
    .filter((name) => name !== 'index');
}

gulp.task('tpl:compile', () => {
  const data = {
    _dev: DEVELOPMENT,
    _pages: getPagesList(),
    _mockPort: config.MOCK_PORT,
  };
  const searchPaths = [config.TEMPLATE_BASE, config.SVG_BUILD];
  const options = {
    noCache: PRODUCTION,
  };
  const env = new Environment(new FileSystemLoader(searchPaths, options));
  env.addGlobal('_cssPath', config.CSS_TPL_PATH);
  env.addGlobal('_jsPath', config.JS_TPL_PATH);
  env.addGlobal('_gfxPath', config.GFX_TPL_PATH);
  env.addGlobal('_svgPath', config.SVG_TPL_PATH);
  env.addGlobal('_svgSpritesPath', config.SVG_SPRITES_TPL_PATH);

  const prettifyOptions = {
    indent_handlebars: true,
    indent_inner_html: true,
    preserve_newlines: false,
    max_preserve_newlines: 0,
    unformatted: ['pre', 'code'],
    extra_liners: [],
    brace_style: 'collapse',
    indent_char: ' ',
    indent_size: 2,
  };

  return (
    gulp
      .src(config.TEMPLATE_PAGES)
      // Temporary fix for gulp's error handling within streams, see https://github.com/actum/gulp-dev-stack/issues/7#issuecomment-152490084
      .pipe(
        plumber({
          errorHandler: (e) =>
            gutil.log(
              gutil.colors.red(`${e.name} in ${e.plugin}: ${e.message}`),
            ),
        }),
      )
      // https://mozilla.github.io/nunjucks/api.html#filesystemloader
      .pipe(nunjucks.compile(data, { env }))
      .pipe(rename((path) => (path.extname = '.html')))
      .pipe(gulpif(PRODUCTION, prettify(prettifyOptions)))
      .pipe(gulp.dest(config.BUILD_BASE))
  );
});

gulp.task('tpl:validate', ['tpl:compile'], () =>
  gulp
    .src(config.HTML_BUILD)
    .pipe(gulpif(PRODUCTION, htmlValidator()))
    .pipe(gulpif(PRODUCTION, htmlValidator.reporter())),
);

// HTML validation is slow, run it only in PRODUCTION mode
gulp.task('tpl', [PRODUCTION ? 'tpl:validate' : 'tpl:compile'], (done) => {
  browserSync.reload();
  done();
});
