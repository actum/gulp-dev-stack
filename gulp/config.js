module.exports = {
    port: 5001,
    title: 'Gulp Dev Stack',
    paths: {
        gulpfile: {
            entry: './gulpfile.js',
            rest: './gulp/**/*.js'
        },
        npm: './node_modules',
        src: {
            base: './src',
            styles: {
                base: './src/styles',
                entry: [
                    './src/styles/main.scss',
                    './src/styles/critical.scss'
                ],
                all: './src/styles/**/*.scss'
            },
            app: {
                base: './src/app',
                entry: './src/app/app.js',
                all: './src/app/**/*.js'
            },
            tpl: {
                base: './src/tpl',
                entry: './src/tpl/*.nunj',
                all: './src/tpl/**/*.nunj'
            },
            icon: './src/gfx/svg/*.svg',
            html: './src/*.html'
        },
        dist: {
            base: './dist',
            css: './dist/css',
            js: './dist/js',
            gfx: './dist/gfx',
            icon: './dist/gfx/icon',
            html: './dist/*.html'
        },
        styleguide: {
            base: './styleguide',
            destination: './styleguide/styleguide',
            template: './node_modules/styleguide/dist',
            homepage: '../../styleguide.md',
            css: './css/main.css',
            js: './js/app.js'
        }
    },
    names: {
        js: {
            src: 'app.js',
            min: 'app.min.js'
        }
    }
};
