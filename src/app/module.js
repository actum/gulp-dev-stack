/**
 * @param {jQuery} container
 */
var MyModule = function(container) {
    this.container = container;

    document.querySelector('.main h1').innerText += '_js';
};

module.exports = MyModule;