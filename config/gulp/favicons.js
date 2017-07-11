import fs from 'fs';
import gulp from 'gulp';
import realFavicon from 'gulp-real-favicon';
import {
    TITLE,
    BUILD_BASE,
    HTML_BUILD,
    FAVICON_SOURCE,
    FAVICON_JSON,
    FAVICON_COLORS as colors
} from '../../config';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', (done) => {
    realFavicon.generateFavicon({
        masterPicture: FAVICON_SOURCE,
        dest: BUILD_BASE,
        iconsPath: '/',
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
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
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: colors.bg,
                manifest: {
                    name: TITLE,
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'blackAndWhite',
                threshold: 75,
                themeColor: colors.fg
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: FAVICON_JSON
    }, () => {
        done();
    });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', () => {
    gulp.src(HTML_BUILD)
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_JSON)).favicon.html_code))
        .pipe(gulp.dest(BUILD_BASE));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', () => {
    const currentVersion = JSON.parse(fs.readFileSync(FAVICON_JSON)).version;
    realFavicon.checkForUpdates(currentVersion, (err) => {
        if (err) {
            throw err;
        }
    });
});
