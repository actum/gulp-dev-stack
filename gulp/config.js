/* eslint-disable one-var */
const environment = require('./environment');

const
    /* General */
    PORT                = 5001,
    TITLE               = 'Gulp Development Stack',

    /* ENVIRONMENT */
    ENVIRONMENT         = {
        NAME:           environment.name,
        IS_DEVELOPMENT: environment.isDevelopment,
        IS_PRODUCTION:  environment.isProduction
    },

    /* Paths */
    NPM                 = './node_modules',
    DEVELOPMENT_BASE    = './src',
    BUILD_BASE          = './dist',

    /* Gulp */
    GULP_ALL            = ['./gulpfile.js', './gulp/**/*.js'],

    /* CSS */
    CSS_BASE            = `${DEVELOPMENT_BASE}/styles`,
    CSS_ENTRY           = `${CSS_BASE}/main.scss`,
    CSS_ALL             = `${CSS_BASE}/**/*.scss`,
    CSS_BUILD           = `${BUILD_BASE}/css`,

    /* JavaScript */
    JS_BASE             = `${DEVELOPMENT_BASE}/app`,
    JS_ENTRY            = `${JS_BASE}/app.js`,
    JS_ALL              = `${JS_BASE}/**/*.js`,
    JS_BUILD            = `${BUILD_BASE}/js`,

    /* GFX */
    GFX_BASE            = `${DEVELOPMENT_BASE}/gfx`,

    /* Favicon */
    FAVICON_COLORS      = {
        fg: '#e83a29',
        bg: '#ffffff'
    },
    FAVICON_BASE        = `${GFX_BASE}`,
    FAVICON_SOURCE      = `${FAVICON_BASE}/favicon-source.png`,
    FAVICON_JSON        = 'faviconData.json',

    /* SVG */
    SVG_ALL             = `${GFX_BASE}/svg/*.svg`,
    SVG_BUILD           = `${BUILD_BASE}/gfx/icon`,

    /* Templates */
    TEMPLATE_BASE       = `${DEVELOPMENT_BASE}/tpl`,
    TEMPLATE_ENTRY      = `${TEMPLATE_BASE}/*.nunj`,
    TEMPLATE_ALL        = `${TEMPLATE_BASE}/**/*.nunj`,

    /* HTML */
    HTML_ALL            = `${DEVELOPMENT_BASE}/*.html`,
    HTML_BUILD          = `${BUILD_BASE}/*.html`,

    /* Styleguide */
    STYLEGUIDE_BASE     = './styleguide',
    STYLEGUIDE_SOURCE   = `${CSS_BASE}`,
    STYLEGUIDE_DEST     = `${STYLEGUIDE_BASE}/styleguide`,
    STYLEGUIDE_TEMPLATE = `${NPM}/styleguide/dist`,
    STYLEGUIDE_CSS      = `${CSS_BUILD}/main.css`,
    STYLEGUIDE_JS       = [];

module.exports = {
    PORT,
    TITLE,
    ENVIRONMENT,
    NPM,
    DEVELOPMENT_BASE,
    BUILD_BASE,
    GULP_ALL,

    CSS_BASE,
    CSS_ENTRY,
    CSS_ALL,
    CSS_BUILD,

    JS_BASE,
    JS_ENTRY,
    JS_ALL,
    JS_BUILD,

    GFX_BASE,
    FAVICON_COLORS,
    FAVICON_BASE,
    FAVICON_SOURCE,
    FAVICON_JSON,
    SVG_ALL,
    SVG_BUILD,

    TEMPLATE_BASE,
    TEMPLATE_ENTRY,
    TEMPLATE_ALL,
    HTML_ALL,
    HTML_BUILD,

    STYLEGUIDE_BASE,
    STYLEGUIDE_SOURCE,
    STYLEGUIDE_DEST,
    STYLEGUIDE_TEMPLATE,
    STYLEGUIDE_CSS,
    STYLEGUIDE_JS
};

// module.exports = {
//     port: 5001,
//     title: 'Gulp Dev Stack',
//     paths: {
//         gulpfile: {
//             entry: './gulpfile.js',
//             rest: './gulp/**/*.js'
//         },
//         npm: './node_modules',
//         src: {
//             base: './src',
//             styles: {
//                 base: './src/styles',
//                 entry: [
//                     './src/styles/main.scss',
//                     './src/styles/secondary.scss'
//                 ],
//                 all: './src/styles/**/*.scss'
//             },
//             app: {
//                 base: './src/app',
//                 entry: './src/app/app.js',
//                 all: './src/app/**/*.js'
//             },
//             tpl: {
//                 base: './src/tpl',
//                 entry: './src/tpl/*.nunj',
//                 all: './src/tpl/**/*.nunj'
//             },
//             icon: './src/gfx/svg/*.svg',
//             html: './src/*.html'
//         },
//         dist: {
//             base: './dist',
//             css: './dist/css',
//             js: './dist/js',
//             icon: './dist/gfx/icon',
//             html: './dist/*.html'
//         },
//         styleguide: {
//             base: './styleguide',
//             source: './src/styles',
//             destination: './styleguide/styleguide',
//             template: './node_modules/styleguide/dist',
//             css: './css/main.css',
//             js: []
//         }
//     },
//     names: {
//         js: {
//             src: 'app.js',
//             min: 'app.min.js'
//         }
//     }
// };
