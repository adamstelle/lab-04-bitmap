'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');


gulp.task('test', function(){
  gulp.src(`${__dirname}/test/*-test.js`, {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['test']);
