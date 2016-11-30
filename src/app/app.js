import 'babel-polyfill';
/**
 * https://github.com/Keyamoon/svgxuse
 * If you do not use SVG <use xlink:href="…"> elements, remove svgxuse module
 */
import 'svgxuse';
import init from './init';
// import factory from './factory';
import cookieLaw from './components/cookie-law';

const app = () => {
    init(cookieLaw, document.getElementById('cookie-law'));
};

app(window.config);
