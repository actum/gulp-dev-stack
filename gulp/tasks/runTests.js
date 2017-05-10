const gulp = require('gulp');
const jest = require('gulp-jest').default;

gulp.task('runTests', function () {
  return gulp.src('__tests__').pipe(jest({
    config: {
      "transformIgnorePatterns": [
        "<rootDir>/dist/", "<rootDir>/node_modules/"
      ],
      "automock": false
    }
  }));
});
