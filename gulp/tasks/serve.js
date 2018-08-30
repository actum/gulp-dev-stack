const gulp = require('gulp');
const gutil = require('gulp-util');
const gwatch = require('gulp-watch');
const browserSync = require('browser-sync');
const copyToClipboard = require('copy-paste').copy;
const runSequence = require('run-sequence');

const config = require('../config');

const DEVELOPMENT = config.environment.isDevelopment;
const port = config.PORT;

gulp.task('serve', ['prepare'], () => {
  const baseDir = DEVELOPMENT
    ? [config.BUILD_BASE, config.NPM, config.STYLEGUIDE_BASE]
    : config.BUILD_BASE;

  browserSync(
    {
      port,
      server: { baseDir },
      open: false,
    },
    (_unknown, bs) => {
      const finalPort = bs.options.get('port');
      copyToClipboard(`localhost:${finalPort}`, () =>
        gutil.log(
          gutil.colors.green(
            'Local server address has been copied to your clipboard',
          ),
        ),
      );
    },
  );

  const watch = (glob, tasks) => gwatch(glob, () => runSequence(...tasks));

  if (DEVELOPMENT) {
    watch(config.CSS_ALL, ['styles', 'styleguide', 'copySgAssets']);
    watch(config.JS_ALL, ['eslint:app']);
    watch(config.GULPFILE, ['eslint:gulpfile']);
    watch(config.GULP_TASKS, ['eslint:gulpTasks']);
    watch(config.MOCK_ALL, ['eslint:mock']);
    watch(config.IMAGES_ALL, ['images', 'tpl']);
    watch(config.SVG_SPRITE_ALL, ['svg', 'tpl']);
    watch(config.TEMPLATE_ALL, ['tpl']);
    watch(config.API, ['api-reload']);
  }
});
