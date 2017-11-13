import config from '../../config';
import gulp from 'gulp';
import gutil from 'gulp-util';
import enableDestroy from 'server-destroy';
import jsonServer from 'json-server';
let server;

function requireUncached(module) {
    delete require.cache[require.resolve(module)];

    return require(module); // eslint-disable-line
}

function start(cb) {
    const api = requireUncached('../../src/api/api');
    const app = jsonServer.create();
    const router = jsonServer.router(api());
    const middleware = jsonServer.defaults();

    app.use(middleware);
    app.use(router);

    server = app.listen(API_PORT, () => {
        gutil.log(
            gutil.colors.green('JSON Server is running...'),
            gutil.colors.gray(`http://localhost:${API_PORT}`)
        );
    });
    enableDestroy(server);
}

gulp.task('api', start);

gulp.task('api:reload', (cb) => {
    gutil.log(gutil.colors.gray('api has changed, reloading...'));
    server && server.destroy();
    start();

    return cb();
});
