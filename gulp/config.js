module.exports = {
    port: 5001,
    title: 'Gulp Dev Stack',
    paths: {
        gulpfile: './gulpfile.js',
        npm: './node_modules',
        src: {
            base: './src',
            styles: {
                base: './src/styles',
                entry: [
                    './src/styles/main.scss',
                    './src/styles/secondary.scss'
                ],
                all: './src/styles/**/*.scss'
            },
            fonts: {
                base: './src/styles/fonts',
                faces: './src/styles/fonts/**/*.css',
                all: './src/styles/fonts/**/*.ttf'
            },
            app: {
                base: './src/app',
                entry: './src/app/app.js',
                vendor: {
                    base: './src/app/vendor',
                    all: './src/app/vendor/**/*.js'
                },
                all: ['./src/app/**/*.js', '!./src/app/{vendor,vendor/**}']
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
            fonts: './dist/css/fonts',
            js: {
                base: './dist/js',
                vendor: './dist/js/vendor'
            },
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
