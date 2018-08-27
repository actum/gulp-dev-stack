const gulp = require('gulp');
const gutil = require('gulp-util');
const enableDestroy = require('server-destroy');
const jsonServer = require('json-server');

const config = require('../config');

let server;

function requireUncached(module) {
  delete require.cache[require.resolve(module)];

    return require(module); // eslint-disable-line
}

function start() {
  const api = requireUncached('../../src/api/api');
  const app = jsonServer.create();
  const router = jsonServer.router(api());
  const middleware = jsonServer.defaults();
  app.use(middleware);
  app.use(router);
  server = app.listen(config.API_PORT, () => {
    gutil.log(
      gutil.colors.green('JSON Server is running…'),
      gutil.colors.gray(`http://localhost:${config.API_PORT}`),
    );
  });
  enableDestroy(server);
}

gulp.task('api', start);

gulp.task('api-reload', (cb) => {
  gutil.log(gutil.colors.gray('api has changed, reloading...'));

  if (server) {
    server.destroy();
  }

  start();

  return cb();
});
