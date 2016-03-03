export default {
    paths: {
        gulpfile: './gulpfile.babel.js',
        src: {
            base: './src',
            bower: './src/bower',
            less: {
                base: './src/less',
                entry: './src/less/main.less',
                all: './src/less/**/*.less',
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
        css: {
            src: 'style.css',
            min: 'style.min.css'
        },
        js: {
            src: 'app.js',
            min: 'app.min.js'
        }
    }
}
