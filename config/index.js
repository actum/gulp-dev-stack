/* Paths */
export const NPM = './node_modules';
export const DEVELOPMENT_BASE = './src';
export const BUILD_DIR = './dist';

/* Gulp */
export const GULP_ALL = ['./gulpfile.js', './gulp/**/*.js'];

/* General */
export const PORT = 5001;
export const TITLE = 'Gulp Development Stack';

/* API server */
export const API = {};
API.PORT = 5003;
API.SRC_ENTRY = `${DEVELOPMENT_BASE}/api/api.js`;

/* CSS */
export const CSS = {};
CSS.SRC_DIR = `${DEVELOPMENT_BASE}/styles`;
CSS.SRC_ENTRY = `${CSS.SRC_DIR}/main.scss`;
CSS.SRC_ALL = `${CSS.SRC_DIR}/**/*.scss`;
CSS.BUILD_DIR = `${BUILD_DIR}/css`;
CSS.TEMPLATES_DIR = '/css';

/* Client application */
export const JS = {};
JS.BUILD_DIR = `${BUILD_DIR}/js`;

export const CLIENT = {};
CLIENT.SRC_DIR = `${DEVELOPMENT_BASE}/app`;
CLIENT.ENTRY = `${CLIENT.SRC_DIR}/app.js`;
CLIENT.BUILD_DIR = `${JS.BUILD_DIR}/client`;
CLIENT.TEMPLATE_DIR = '/js';

/* Vendor bundle */
export const VENDOR = {};
VENDOR.BUILD_DIR = `${JS.BUILD_DIR}/vendor`;
VENDOR.MANIFEST_FILEPATH = `${VENDOR.BUILD_DIR}/vendor-manifest.json`;

/* GFX */
export const GFX = {};
GFX.SRC_DIR = `${DEVELOPMENT_BASE}/gfx`;
GFX.BUILD_DIR = `${BUILD_DIR}/gfx`;
GFX.TEMPLATE_DIR = '/gfx';

/* Favicon */
export const FAVICON = {};
FAVICON.COLORS = {
    fg: '#e83a29',
    bg: '#ffffff'
};
FAVICON.SRC_DIR = `${GFX.SRC_DIR}`;
FAVICON.SRC_ENTRY = `${FAVICON.SRC_DIR}/favicon-source.png`;
FAVICON.SRC_JSON = 'faviconData.json';

/* SVG */
export const SVG = {};
SVG.SRC_DIR = `${GFX.SRC_DIR}/svg`;
SVG.BUILD_DIR = `${GFX.BUILD_DIR}/svg`;

SVG.SINGLE = {};
SVG.SINGLE.SRC_ALL = `${SVG.SRC_DIR}/*.svg`;
SVG.SINGLE.BUILD_DIR = `${GFX.BUILD_DIR}/svg`;
SVG.SINGLE.TEMPLATE_DIR = `${GFX.TEMPLATE_DIR}/svg`;

SVG.SPRITES = {};
SVG.SPRITES.SRC_ALL = [
    `${SVG.SRC_DIR}/**/*.svg`,
    `!${SVG.SINGLE.SRC_ALL}`
];
SVG.SPRITES.BUILD_DIR = `${SVG.BUILD_DIR}/sprites`;
SVG.SPRITES.TEMPLATE_DIR = `${SVG.SINGLE.TEMPLATE_DIR}/sprites`;

/* GFX */
GFX.SRC_ALL = [
    `${GFX.SRC_DIR}/**/*.{jpg,jpeg,png,gif}`,
    `${SVG.SINGLE.SRC_ALL}`,
    `!${FAVICON.SRC_ENTRY}`
];

/* Templates */
export const TEMPLATES = {};
TEMPLATES.SRC_DIR = `${DEVELOPMENT_BASE}/tpl`;
TEMPLATES.SRC_PAGES = `${TEMPLATES.SRC_DIR}/*.nunj`;
TEMPLATES.SRC_ALL = `${TEMPLATES.SRC_DIR}/**/*.nunj`;

/* HTML */
export const HTML = {};
HTML.SRC_ALL = `${DEVELOPMENT_BASE}/*.html`;
HTML.BUILD_DIR = `${BUILD_DIR}/*.html`;

/* Styleguide */
export const STYLEGUIDE = {};
STYLEGUIDE.SRC_DIR = './styleguide';
STYLEGUIDE.HOMEPAGE = '../../styleguide.md'; // why is it going back two dirs??
STYLEGUIDE.BUILD_DIR = `${STYLEGUIDE.SRC_DIR}/styleguide`;
STYLEGUIDE.TEMPLATE_DIR = `${NPM}/styleguide/dist`;

/* Deployment */
export const DEPLOY = {};
DEPLOY.HOST = '';
DEPLOY.USERNAME = '';
DEPLOY.PASSWORD = '';
DEPLOY.BUILD_DIR = '';
