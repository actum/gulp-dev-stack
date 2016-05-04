export default {
    paths: {
        gulpfile: './gulpfile.babel.js',
        npm: './node_modules',
        src: {
            base: './src',
            styles: {
                base: './src/styles',
                entry: [
                    './src/styles/main.scss',
                    './src/styles/secondary.scss'
                ],
                all: './src/styles/**/*.scss',
                dest: './src/css'
            },
            app: {
                base: './src/app',
                entry: './src/app/app.js',
                all: './src/app/**/*.js',
                dest: './src/js'
            },
            tpl: {
                base: './src/tpl',
                entry: './src/tpl/*.nunj',
                all: './src/tpl/**/*.nunj'
            },
            icon: {
                entry: './src/gfx/svg/*.svg',
                dest: './src/gfx/icon'
            },
            html: './src/*.html'
        },
        dist: {
            base: './dist',
            css: './dist/css',
            js: './dist/js',
            icon: './dist/gfx/icon',
            html: './dist/*.html'
        }
    },
    names: {
        js: {
            src: 'app.js',
            min: 'app.min.js'
        }
    }
}
