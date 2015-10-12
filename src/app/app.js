var MyModule = require('./module.js');

var app = {};

app.start = function() {
    app.myModule = app.init(MyModule, [document.querySelector('.main')]);
    console.log('yay');
};

app.init = function(Klass, args) {
    var container = args[0];
    var argsCount = args.length;

    if (container) {
        if (argsCount === 1) {
            return new Klass(container);
        } else if (argsCount === 2) {
            return new Klass(container, args[1]);
        } else if (argsCount === 3) {
            return new Klass(container, args[1], args[2]);
        } else if (argsCount === 4) {
            return new Klass(container, args[1], args[2], args[3]);
        }
    }
};

app.factory = function(Klass, args) {
    var containers = args[0];
    var containersCount = containers.length;
    var argsCount = args.length;
    var returnArray = [];

    if (containersCount) {
        for (var i = 0; i < containersCount; i++) {
            if (argsCount === 1) {
                returnArray.push(new Klass($(containers.get(i))));
            } else if (argsCount === 2) {
                returnArray.push(new Klass($(containers.get(i)), args[1]));
            } else if (argsCount === 3) {
                returnArray.push(new Klass($(containers.get(i)), args[1], args[2]));
            } else if (argsCount === 4) {
                returnArray.push(new Klass($(containers.get(i)), args[1], args[2], args[3]));
            }
        }
    }

    return returnArray;
};

window.app = app;
