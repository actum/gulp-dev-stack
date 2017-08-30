/* General */
export const PORT = 5001;
export const TITLE = 'Gulp Development Stack';

/* API server */
export const API = `${DEVELOPMENT_BASE}/api/api.js`;
export const API_PORT = 5003;

/* Paths */
export const NPM = './node_modules';
export const DEVELOPMENT_BASE = './src';
export const BUILD_BASE = './dist';

/* Gulp */
export const GULP_ALL = ['./gulpfile.js', './gulp/**/*.js'];

/* CSS */
export const CSS = {};
CSS.BASE_DIR = `${DEVELOPMENT_BASE}/styles`;
CSS.ENTRY = `${CSS.BASE_DIR }/main.scss`;
CSS.BUILD_DIR = `${BUILD_BASE}/css`;

export const CSS_BASE = `${DEVELOPMENT_BASE}/styles`;
export const CSS_ENTRY = `${CSS_BASE}/main.scss`;
export const CSS_ALL = `${CSS_BASE}/**/*.scss`;
export const CSS_BUILD = `${BUILD_BASE}/css`;
export const CSS_TPL_PATH = '/css';

/* Client application */
export const CLIENT = {};
CLIENT.SRC_DIR = `${DEVELOPMENT_BASE}/app`;
CLIENT.ENTRY = `${CLIENT.SRC_DIR}/app.js`;
CLIENT.BUILD_BASE_DIR = `${BUILD_BASE}/js`;
CLIENT.BUILD_DIR = `${CLIENT.BUILD_BASE_DIR}/client`;
CLIENT.TEMPLATE_DIR = '/js';

// export const JS_BASE = `${DEVELOPMENT_BASE}/app`;
// export const JS_ENTRY = `${JS_BASE}/app.js`;
// export const JS_ALL = `${JS_BASE}/**/*.js`;
// export const JS_BUILD = `${BUILD_BASE}/js`;
// export const JS_CLIENT_BUILD = `${JS_BUILD}/client`;
// export const JS_VENDOR_BUILD = `${JS_BUILD}/vendor`;

/* Vendor bundle */
export const VENDOR = {};
VENDOR.BUILD_DIR = `${CLIENT.BUILD_BASE_DIR}/vendor`;
VENDOR.MANIFEST_FILEPATH = `${VENDOR.BUILD_DIR}/vendor-manifest.json`;

/* GFX */
export const GFX_BASE = `${DEVELOPMENT_BASE}/gfx`;
export const GFX_BUILD = `${BUILD_BASE}/gfx`;
export const GFX_TPL_PATH = '/gfx';

/* SVG */
export const SVG_BASE = `${GFX_BASE}/svg`;
export const SVG_SINGLE_ALL = `${SVG_BASE}/*.svg`;
export const SVG_SPRITE_ALL = [
    `${SVG_BASE}/**/*.svg`,
    `!${SVG_SINGLE_ALL}`
];
export const SVG_BUILD = `${GFX_BUILD}/svg`;
export const SVG_BUILD_SPRITES = `${SVG_BUILD}/sprites`;
export const SVG_TPL_PATH = `${GFX_TPL_PATH}/svg`;
export const SVG_SPRITES_TPL_PATH = `${SVG_TPL_PATH}/sprites`;

/* Favicon */
export const FAVICON_COLORS = {
    fg: '#e83a29',
    bg: '#ffffff'
};
export const FAVICON_BASE = `${GFX_BASE}`;
export const FAVICON_SOURCE = `${FAVICON_BASE}/favicon-source.png`;
export const FAVICON_JSON = 'faviconData.json';

export const IMAGES_ALL = [
    `${GFX_BASE}/**/*.{jpg,jpeg,png,gif}`,
    `${SVG_SINGLE_ALL}`,
    `!${FAVICON_SOURCE}`
];

/* Templates */
export const TEMPLATE_BASE = `${DEVELOPMENT_BASE}/tpl`;
export const TEMPLATE_PAGES = `${TEMPLATE_BASE}/*.nunj`;
export const TEMPLATE_ALL = `${TEMPLATE_BASE}/**/*.nunj`;

/* HTML */
export const HTML_ALL = `${DEVELOPMENT_BASE}/*.html`;
export const HTML_BUILD = `${BUILD_BASE}/*.html`;

/* Styleguide */
export const STYLEGUIDE_BASE = './styleguide';
export const STYLEGUIDE_HOMEPAGE = `../../styleguide.md`;
export const STYLEGUIDE_DEST = `${STYLEGUIDE_BASE}/styleguide`;
export const STYLEGUIDE_TEMPLATE = `${NPM}/styleguide/dist`;

/* Deployment */
export const DEPLOY_HOST = '';
export const DEPLOY_USERNAME = '';
export const DEPLOY_PASSWORD = '';
export const DEPLOY_DEST = '/home/deploy/packages';
