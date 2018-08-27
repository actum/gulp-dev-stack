const environment = require('./environment');

/* General */
const PORT = 5001;
const TITLE = 'Gulp Development Stack';

/* Paths */
const NPM = './node_modules';
const DEVELOPMENT_BASE = './src';
const BUILD_BASE = './dist';

/* Gulp */
const GULPFILE = './gulpfile.js';
const GULP_BASE = './gulp';
const GULP_TASKS = `${GULP_BASE}/**/*.js`;
const GULP_ALL = [GULPFILE, GULP_TASKS];

/* CSS */
const CSS_BASE = `${DEVELOPMENT_BASE}/styles`;
const CSS_ENTRY = `${CSS_BASE}/main.scss`;
const CSS_ALL = `${CSS_BASE}/**/*.scss`;
const CSS_BUILD = `${BUILD_BASE}/css`;
const CSS_TPL_PATH = '/css';

/* JavaScript */
const JS_BASE = `${DEVELOPMENT_BASE}/app`;
const JS_MAIN_FILENAME = 'app.js';
const JS_ENTRY = `${JS_BASE}/${JS_MAIN_FILENAME}`;
const JS_ALL = `${JS_BASE}/**/*.js`;
const JS_VENDOR_ALL = `${JS_BASE}/vendor/**/*.js`;
const JS_BUILD = `${BUILD_BASE}/js`;
const JS_TPL_PATH = '/js';

/* GFX */
const GFX_BASE = `${DEVELOPMENT_BASE}/gfx`;
const GFX_BUILD = `${BUILD_BASE}/gfx`;
const GFX_TPL_PATH = '/gfx';

/* SVG */
const SVG_BASE = `${GFX_BASE}/svg`;
const SVG_SINGLE_ALL = `${SVG_BASE}/*.svg`;
const SVG_SPRITE_ALL = [`${SVG_BASE}/**/*.svg`, `!${SVG_SINGLE_ALL}`];
const SVG_BUILD = `${GFX_BUILD}/svg`;
const SVG_BUILD_SPRITES = `${SVG_BUILD}/sprites`;
const SVG_TPL_PATH = `${GFX_TPL_PATH}/svg`;
const SVG_SPRITES_TPL_PATH = `${SVG_TPL_PATH}/sprites`;

/* Favicon */
const FAVICON_COLORS = {
  fg: '#e83a29',
  bg: '#ffffff',
};
const FAVICON_BASE = `${GFX_BASE}`;
const FAVICON_SOURCE = `${FAVICON_BASE}/favicon-source.png`;
const FAVICON_JSON = 'faviconData.json';

const IMAGES_ALL = [
  `${GFX_BASE}/**/*.{jpg,jpeg,png,gif}`,
  `${SVG_SINGLE_ALL}`,
  `!${FAVICON_SOURCE}`,
];

/* Templates */
const TEMPLATE_BASE = `${DEVELOPMENT_BASE}/tpl`;
const TEMPLATE_PAGES = `${TEMPLATE_BASE}/*.nunj`;
const TEMPLATE_ALL = `${TEMPLATE_BASE}/**/*.nunj`;

/* HTML */
const HTML_ALL = `${DEVELOPMENT_BASE}/*.html`;
const HTML_BUILD = `${BUILD_BASE}/*.html`;

/* Styleguide */
const STYLEGUIDE_BASE = './styleguide';
const STYLEGUIDE_HOMEPAGE = '../../styleguide.md';
const STYLEGUIDE_DEST = `${STYLEGUIDE_BASE}/styleguide`;
const STYLEGUIDE_TEMPLATE = `${NPM}/styleguide/dist`;
const STYLEGUIDE_CSS = [
  `${CSS_TPL_PATH}/main.css`,
  'https://fonts.googleapis.com/css?family=Roboto:400,700:latin',
];
const STYLEGUIDE_JS = [`${JS_TPL_PATH}/app.js`];

// deploy
const DEPLOY_HOST = '';
const DEPLOY_USERNAME = '';
const DEPLOY_PASSWORD = '';
const DEPLOY_DEST = '/home/deploy/packages';

// api
const API = `${DEVELOPMENT_BASE}/api/api.js`;
const API_PORT = 5003;

// mock-server
const MOCK_BASE = `${DEVELOPMENT_BASE}/server`;
const MOCK_START = `${MOCK_BASE}/index.js`;
const MOCK_ALL = `${MOCK_BASE}/**/*.js`;
const MOCK_PORT = 5005;

module.exports = {
  PORT,
  TITLE,
  environment,

  NPM,
  DEVELOPMENT_BASE,
  BUILD_BASE,

  GULPFILE,
  GULP_TASKS,
  GULP_BASE,
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
  STYLEGUIDE_CSS,
  STYLEGUIDE_JS,

  DEPLOY_HOST,
  DEPLOY_USERNAME,
  DEPLOY_PASSWORD,
  DEPLOY_DEST,

  API,
  API_PORT,

  MOCK_BASE,
  MOCK_START,
  MOCK_ALL,
  MOCK_PORT,
};
