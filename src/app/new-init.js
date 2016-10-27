// import config from '../../gulp/config';

export default function _newInit(component, containers) {
    // const modules = config.JS_BASE;
    console.warn('_newInit');
    console.log(component);

    require.ensure([component], function (require) {
        
        console.log(require);
        // require([component]);
        const c = require(component);

        console.log(c);

        // c.default.init(containers);

    }, 'my_chunk_name');

    // System.import(`${component}`).then(module => {
    //     console.log(module);
    //     Array.from(containers).map(container => {
    //         module.default.init(container);
    //     });
    // }).catch(error => {
    //     console.error(error);
    // });
}
