// Include gulp
var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var usemin = require('gulp-usemin');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var history = require('connect-history-api-fallback');
var wiredep = require('wiredep').stream;


var paths = {
  scripts: ['./client/app/**/*.js'],
  scss: ['./client/scss/*.scss'],
  scssIndex: ['./client/scss/styles.scss'],
  html: [
    './client/app/**/*.html',
    '!./client/index.html',
  ],
  index: './client/index.html',
  build: './build/'
}
/* 1 */
gulp.task('clean', function () {
  gulp.src(paths.build, {read: false})
    .pipe(clean());
});

gulp.task('copy', ['clean'], function () {
  gulp.src(paths.html)
    .pipe(gulp.dest('build/'));
});

gulp.task('usemin', ['copy'], function () {
  gulp.src(paths.index)
    .pipe(usemin({
      css: ['styles'],
      js: [uglify()]
    }))
    .pipe(gulp.dest(paths.build))
});

gulp.task('build', ['usemin']);

// connect
gulp.task('connect', function () {
  connect.server({
    root: 'client/',
    livereload: true
  });
});

gulp.task('wiredep', function () {
  return gulp.src(paths.index)
    .pipe(wiredep())
    .pipe(gulp.dest('./client'))
    .pipe(connect.reload());
});

gulp.task('styles', function () {
  return gulp.src(paths.scssIndex)
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./client/scss'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  return watch(paths.scss, function () {
    gulp.start('styles');
  });
});

gulp.task('default', ['connect', 'watch']);
