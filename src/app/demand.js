/*
*
* Demand
*
* Creates a promise to require a certain module/component
* when its container(s) is present on the page. Serves as
* a split point for Webpack.
*
* All satisfied demands are listed in "window.app.modules"
* for faster debugging.
*
* Example:
*   demand('./components/my-component', document.getElementById('#container'));
*
*/

export default function demand(component, containers, ...args) {
    /* Satisfy the demand only when containers are present */
    if (containers && containers.length > 0) {

        /* Unitize component entry point */
        const entry = '/index.js';
        !(component.includes(entry)) && (component += entry);

        System.import(`${component}`).then(module => {
            Array.from(containers).map(container => {
                return module.default.init(container, ...args);
            });

            /* Register the module within the app */
            window.app.modules.push({
                name: module.name,
                path: component
            });

            return module;
        }).catch(error => {
            return new Error(`Demand: Cannot demand module "${module.name}" (${module}}): ${error}`);
        });

        /*
            Webpack ensure approach
            System.import does not support dynamic chunk naming, there is another way
            to split the app into chunks (require.ensure).
        */
        // require.ensure([], (require) => {
        //     const module = require(`${component}`);

        //     Array.from(containers).map(container => {
        //         return module.default.init(container, config);
        //     });
        // }, 'chunk name');
    }

    return false;
}
