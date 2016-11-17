const config = require('../config');
const gulp = require('gulp');
const gulpFile = require('gulp-file');
const jsonServer = require('gulp-json-srv');
const path = require('path');
const api = require(path.relative(__dirname, config.API));

const server = jsonServer.create({
    port: config.API_PORT
});

gulp.task('api', () => {
    return gulpFile('in-memory-api.js', JSON.stringify(api()), { src: true })
        .pipe(server.pipe());
});
