const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const config = require('../config');

function server() {
  nodemon({
    script: config.MOCK_START,
    watch: config.MOCK_BASE,
  });
}

gulp.task('server', server);
