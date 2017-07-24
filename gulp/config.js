/* eslint-disable one-var */
const environment = require('./environment');

const
    /* General */
    PORT = 5001,
    TITLE = 'Gulp Development Stack',

    /* Paths */
    NPM = './node_modules',
    DEVELOPMENT_BASE = './src',
    BUILD_BASE = './dist',

    /* Gulp */
    GULP_ALL = ['./gulpfile.js', './gulp/**/*.js'],

    /* CSS */
    CSS_BASE = `${DEVELOPMENT_BASE}/styles`,
    CSS_ENTRY = `${CSS_BASE}/main.scss`,
    CSS_ALL = `${CSS_BASE}/**/*.scss`,
    CSS_BUILD = `${BUILD_BASE}/css`,
    CSS_TPL_PATH = '/css',

    /* JavaScript */
    JS_BASE = `${DEVELOPMENT_BASE}/app`,
    JS_MAIN_FILENAME = 'app.js',
    JS_ENTRY = `${JS_BASE}/${JS_MAIN_FILENAME}`,
    JS_ALL = `${JS_BASE}/**/*.js`,
    JS_VENDOR_ALL = `${JS_BASE}/vendor/**/*.js`,
    JS_BUILD = `${BUILD_BASE}/js`,
    JS_TPL_PATH = '/js',

    /* GFX */
    GFX_BASE = `${DEVELOPMENT_BASE}/gfx`,
    GFX_BUILD = `${BUILD_BASE}/gfx`,
    GFX_TPL_PATH = '/gfx',

    /* SVG */
    SVG_BASE = `${GFX_BASE}/svg`,
    SVG_SINGLE_ALL = `${SVG_BASE}/*.svg`,
    SVG_SPRITE_ALL = [
        `${SVG_BASE}/**/*.svg`,
        `!${SVG_SINGLE_ALL}`
    ],
    SVG_BUILD = `${GFX_BUILD}/svg`,
    SVG_BUILD_SPRITES = `${SVG_BUILD}/sprites`,
    SVG_TPL_PATH = `${GFX_TPL_PATH}/svg`,
    SVG_SPRITES_TPL_PATH = `${SVG_TPL_PATH}/sprites`,

    /* Favicon */
    FAVICON_COLORS = {
        fg: '#e83a29',
        bg: '#ffffff'
    },
    FAVICON_BASE = `${GFX_BASE}`,
    FAVICON_SOURCE = `${FAVICON_BASE}/favicon-source.png`,
    FAVICON_JSON = 'faviconData.json',

    IMAGES_ALL = [
        `${GFX_BASE}/**/*.{jpg,jpeg,png,gif}`,
        `${SVG_SINGLE_ALL}`,
        `!${FAVICON_SOURCE}`
    ],

    /* Templates */
    TEMPLATE_BASE = `${DEVELOPMENT_BASE}/tpl`,
    TEMPLATE_PAGES = `${TEMPLATE_BASE}/*.nunj`,
    TEMPLATE_ALL = `${TEMPLATE_BASE}/**/*.nunj`,

    /* HTML */
    HTML_ALL = `${DEVELOPMENT_BASE}/*.html`,
    HTML_BUILD = `${BUILD_BASE}/*.html`,

    /* Styleguide */
    STYLEGUIDE_BASE = './styleguide',
    STYLEGUIDE_HOMEPAGE = `../../styleguide.md`,
    STYLEGUIDE_DEST = `${STYLEGUIDE_BASE}/styleguide`,
    STYLEGUIDE_TEMPLATE = `${NPM}/styleguide/dist`,

    // deploy
    DEPLOY_HOST = '',
    DEPLOY_USERNAME = '',
    DEPLOY_PASSWORD = '',
    DEPLOY_DEST = '/home/deploy/packages',

    // api
    API = `${DEVELOPMENT_BASE}/api/api.js`,
    API_PORT = 5003;

module.exports = {
    PORT,
    TITLE,
    environment,

    NPM,
    DEVELOPMENT_BASE,
    BUILD_BASE,
    GULP_ALL,

    CSS_BASE,
    CSS_ENTRY,
    CSS_ALL,
    CSS_BUILD,
    CSS_TPL_PATH,

    JS_BASE,
    JS_MAIN_FILENAME,
    JS_ENTRY,
    JS_ALL,
    JS_VENDOR_ALL,
    JS_BUILD,
    JS_TPL_PATH,

    GFX_BASE,
    GFX_BUILD,
    GFX_TPL_PATH,
    IMAGES_ALL,
    FAVICON_COLORS,
    FAVICON_BASE,
    FAVICON_SOURCE,
    FAVICON_JSON,
    SVG_BASE,
    SVG_SINGLE_ALL,
    SVG_SPRITE_ALL,
    SVG_BUILD,
    SVG_BUILD_SPRITES,
    SVG_TPL_PATH,
    SVG_SPRITES_TPL_PATH,

    TEMPLATE_BASE,
    TEMPLATE_PAGES,
    TEMPLATE_ALL,
    HTML_ALL,
    HTML_BUILD,

    STYLEGUIDE_BASE,
    STYLEGUIDE_HOMEPAGE,
    STYLEGUIDE_DEST,
    STYLEGUIDE_TEMPLATE,

    DEPLOY_HOST,
    DEPLOY_USERNAME,
    DEPLOY_PASSWORD,
    DEPLOY_DEST,

    API,
    API_PORT
};
/* eslint-enable one-var */
