const fs = require('fs');

const gulp = require('gulp');
const realFavicon = require('gulp-real-favicon');

const config = require('../config');

const colors = config.FAVICON_COLORS;

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', (done) => {
  realFavicon.generateFavicon(
    {
      masterPicture: config.FAVICON_SOURCE,
      dest: config.BUILD_BASE,
      iconsPath: '/',
      design: {
        ios: {
          pictureAspect: 'noChange',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true,
          },
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: colors.bg,
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false,
            },
          },
        },
        androidChrome: {
          pictureAspect: 'noChange',
          themeColor: colors.bg,
          manifest: {
            name: config.TITLE,
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true,
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false,
          },
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 75,
          themeColor: colors.fg,
        },
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
      },
      markupFile: config.FAVICON_JSON,
    },
    () => {
      done();
    },
  );
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', () => {
  gulp
    .src(config.HTML_BUILD)
    .pipe(
      realFavicon.injectFaviconMarkups(
        JSON.parse(fs.readFileSync(config.FAVICON_JSON)).favicon.html_code,
      ),
    )
    .pipe(gulp.dest(config.BUILD_BASE));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', () => {
  const currentVersion = JSON.parse(fs.readFileSync(config.FAVICON_JSON))
    .version;
  realFavicon.checkForUpdates(currentVersion, (err) => {
    if (err) {
      throw err;
    }
  });
});
