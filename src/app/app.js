import 'babel-polyfill';
/*
 * https://github.com/Keyamoon/svgxuse
 * If you do not use SVG <use xlink:href="…"> elements, remove svgxuse module
 */
import 'svgxuse';
import demand from './demand';

/* Application structure */
window.app = {
    /* All demanded components on the page */
    modules: []
};

/* Start the application */
window.app.start = (config) => {
    demand('./components/alertify', document.querySelectorAll('.btn'), config);
};
