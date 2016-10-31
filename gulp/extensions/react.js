/*
*
* Extension: React
*
* This extension will install and configure React for your project.
* Please, do not call the commands listed here directly, but rather use "npm run ext-react"
* when setuping the project.
*
*/
const config = require('../config');
const gulp = require('gulp');
const gutil = require('gulp-util');
const write = require('write');
const child_process = require('child_process');

/* Global extension installation success indicator */
var success = true;

/* Dynamic error handler */
function handleError(error, callback) {
    if (error) {
        gutil.log(gutil.colors.red(`Extension React ${error}`));
        success = false;
        return success;
    } else {
        callback();
        return true;
    }
}

function proceed(code, callback) {
    (code == 0) && callback();
}

gulp.task('extension:react', () => {

    /* 1. Install the package */
    gutil.log('Installing packages...');
    const installation = child_process.spawn('npm', ['install', 'react', '-D']);

    installation.stdout.on('data', data => console.log(data.toString()));
    installation.stderr.on('data', data => gutil.log(gutil.colors.red(data.toString())));
    installation.on('error', error => gutil.log(gutil.colors.red(error.toString())));

    installation.on('close', code => {
        proceed(code, () => {

            /* 2. Prepare examples */
            gutil.log('Preparing examples...');
            const exampleFolder = 'react-component';
            child_process.exec(`mkdir ${config.JS_BASE}/${exampleFolder}`, (error) => {
                handleError(error, () => {

                    /* 3. Create an example component */
                    child_process.exec(`touch ${config.JS_BASE}/${exampleFolder}/index.js`, (error) => {
                        handleError(error, () => {

                            write(`${config.JS_BASE}/${exampleFolder}/index.js`, 
`import React, { Component } from 'react';

export default class ReactComponent extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        e.preventDefault();
        alert('The link was clicked.');
    }

    render() {
        return(
            <a
                className="react-example"
                onClick={this.handleClick.bind(this)} >
                My React component
            </a>
        );
    }
}
`
                            );

                            gutil.log(gutil.colors.green('Success'));

                            /* Successfully installed */
                            if (success) {
                                gutil.log(gutil.colors.green('"React" extension has been installed.'));
                                gutil.log(gutil.colors.gray(`See an example component under: ${config.JS_BASE}/${exampleFolder}/index.js`));
                            }
                        });

                    });
                });
            });

        });
    });
});

    // child_process.('npm install -D react', (error, stdout) => { // add "react-dom" here

    //     handleError(error, () => {
    //         gutil.log(gutil.colors.green('Success'));
    //         console.log(stdout);

    //          /* 2. Configure folder structure */
    //         gutil.log('Preparing examples...');

//             const exampleFolder = 'react-component';
//             child_process.exec(`mkdir ${config.JS_BASE}/${exampleFolder}`, { cwd: config.DEVELOPMENT_BASE }, (error) => {
//                 handleError(error, () => {

//                     /* 3. Create an example component */
//                     child_process.exec(`touch ${config.JS_BASE}/${exampleFolder}/index.js`, { cwd: config.DEVELOPMENT_BASE }, (error) => {
//                         handleError(error, () => {

//                             write(`${config.JS_BASE}/${exampleFolder}/index.js`, 
// `import React, { Component } from 'react';

// export default class ReactComponent extends Component {
//     constructor(props) {
//         super(props);
//     }

//     handleClick(e) {
//         e.preventDefault();
//         alert('The link was clicked.');
//     }

//     render() {
//         return(
//             <a
//                 className="react-example"
//                 onClick={this.handleClick.bind(this)} >
//                 My React component
//             </a>
//         );
//     }
// }
// `
//                             );

//                             gutil.log(gutil.colors.green('Success'));

//                             /* Successfully installed */
//                             if (success) {
//                                 gutil.log(gutil.colors.green('"React" extension has been installed.'));
//                                 gutil.log(gutil.colors.gray(`See an example component under: ${config.JS_BASE}/${exampleFolder}/index.js`));
//                             }
//                         });

//                     });
//                 });
//             });

    //     });
    // });
// });
