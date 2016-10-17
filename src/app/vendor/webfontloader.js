import fs from 'fs';
import path from 'path';
import { paths } from '../../../gulp/config';
import css from 'css';
import WebFontLoader from 'webfontloader';

/* Get bundle.css URL */
const { dist } = paths;
const bundleURL = path.relative(dist.base, dist.fonts + '/bundle.css');
console.log(bundleURL);

const FontLoader = function(args) {
    const { cachedFonts } = sessionStorage;

    /* Check if fonts are already cached */
    // if (cachedFonts) {
        // console.log('FONTS ARE ALREADY CACHED');
        // document.documentElement.classList.add('wf-active');

    // } else {

        /* Default options for WebFontLoader */
        const defaults = {
            active: () => {
                console.log('fonts are loaded and SHOULD BE CACHED');
                sessionStorage.cachedFonts = true;
            },
            timeout: 2000
        };

        args = Object.assign(defaults, args);
        console.log(args);

        WebFontLoader.load(args);
    // }
};

/* Declare font loader */
fs.readFile(bundleURL, 'utf8', (err, data) => {
    const fontFamilies = css.parse(data);
});

console.log(fontFamilies);
const fontLoader = new FontLoader({
    custom: {
        families: ['Angeline'],
        urls: [bundleURL]
    }
});

// SMASH MAGAZINE APPROACH
// const { cachedFonts } = sessionStorage;

// if ((window.sessionStorage && cachedFonts) || document.cookie.includes('cachedFonts')) {
//         console.log('font is cached');
//         insertFontsStylesheet();
//     } else {
//         console.log('font is not cached');
//         window.onload = () => {
//             insertFontsStylesheet();
//         }
//     }

//     function insertFontsStylesheet() {
//         console.warn('insertFontsStylesheet');

//         /* Old browsers */
//         if (!window.sessionStorage || !window.XMLHttpRequest) {
//             const stylesheet = document.createElement('link');
//             stylesheet.href = bundleURL;
//             stylesheet.rel = 'stylesheet';
//             stylesheet.type = 'text/css';
//             document.getElementsByTagName('head')[0].appendChild(stylesheet);
//             document.cookie = 'cachedFonts';

//         } else {

//             /* Modern browsers */
//             if (cachedFonts) {
//                 console.log('CACHED: load from sessionStorage');
//                 insertRawCSS(sessionStorage.cachedFontsContent);
//             } else {
//                 console.log('NOT CACHED: send new request');
//                 let xhr = new XMLHttpRequest();
//                 xhr.open('GET', bundleURL, true);
//                 xhr.onreadystatechange = () => {
//                     if (xhr.readyState === 4) {
//                         const response = xhr.responseText;
//                         insertRawCSS(response);
//                         sessionStorage.cachedFonts = true;
//                         sessionStorage.cachedFontsContent = response;
//                     }
//                 }
//                 xhr.send();
//             }
//         }

//     }

//     /* Insert RAW cached fonts */
//     function insertRawCSS(content) {
//         const style = document.createElement('style');
//         style.setAttribute('type', 'text/css');
//         if (style.styleSheet) {
//             style.styleSheet.cssText = content;
//         } else {
//             style.innerHTML = content;
//         }
//         document.getElementsByTagName('head')[0].appendChild(style);
//     }
