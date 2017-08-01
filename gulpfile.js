'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var strip = require('gulp-strip-comments');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');

gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

gulp.task('styles', function() {
  return gulp.src('./_gulp/scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('bundleScripts', function() {
  return gulp.src([
    './_gulp/js/vendor/smoothScroll.js',
    './_gulp/js/vendor/wow.js',
    './_gulp/js/vendor/instafetch.js',
    './_gulp/js/vendor/owlcarousel.js',
    './_gulp/js/app.js'
  ])
  .pipe(concat('app.js'))
  .pipe(strip())
  .pipe(gulp.dest('./assets/js'));
});

gulp.task('minifyBundle', ['bundleScripts'], function() {
  return gulp.src('./assets/js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('./assets/js'));
});

gulp.task('build', ['clear', 'styles', 'minifyBundle']);

gulp.task('watch', function() {
  gulp.watch('./_gulp/scss/**/*.scss', ['styles_']);
  gulp.watch('./_gulp/js/**/*.js', ['minifyBundle']);
});

gulp.task('default', ['build', 'watch']);
