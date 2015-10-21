import MyModule from './module.js';

let app = {};

app.start = function() {
    app.myModule = app.init(MyModule, document.querySelector('.main'));
    console.log('yay');
};

app.init = function(Klass, container, ...args) {
    if (container) {
        return new Klass(container, ...args);
    }
};

app.factory = function(Klass, containers, ...args) {
    return [...containers].map((container) => {
        return new Klass(container, ...args);
    });
};

window.app = app;
