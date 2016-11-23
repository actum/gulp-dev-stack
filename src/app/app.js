import 'babel-polyfill';
/**
 * https://github.com/Keyamoon/svgxuse
 * If you do not use SVG <use xlink:href="…"> elements, remove svgxuse module
 */
import 'svgxuse';
import init from './init';
// import factory from './factory';
import CookiesBar from './components/cookies-bar';

const app = (config) => {
    init(CookiesBar, document.body, config.cookiesBar);
};

app(window.config);
