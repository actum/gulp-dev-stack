import 'babel-polyfill';
/**
 * https://github.com/Keyamoon/svgxuse
 * If you do not use SVG <use xlink:href="…"> elements, remove svgxuse module
 */
import 'svgxuse';

import { init } from './helpers/init';
import { render, renderFactory } from './render';
import configureStore from './store/configureStore';
import cookieLaw from './components/cookie-law';
import suffix from './components/suffix';
import Timer from './components/Timer';
import PlusOne from './components/plus-one/PlusOne';

/**
 * The core component initialization method
 * @param {HTMLElement} container - The container within which components will be initialized
 */
const app = (container, config) => {
  // Init components (single occurance)

  init(cookieLaw, container.querySelector('.js-cookie'));
  init(suffix, container.querySelector('.js-suffix'));

  // Init components (multiple occurance)

  // initMultiple(module, container.getElementsByClassName('js-accordion'));

  const store = configureStore(config);
  render(Timer, document.getElementById('timer'), { from: 100 });
  renderFactory(PlusOne, document.querySelectorAll('.plus-one'), {}, store);
};

// Init the components
app(document, window.config);

// Define a global JS function that can be called from window object (BE can init FE components)
window.reinitJs = app;
