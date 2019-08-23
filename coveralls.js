const gulp = require('gulp');
const coveralls = require('gulp-coveralls');

gulp.src('./coverage/**/lcov.info')
  .pipe(coveralls());
