var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
var fileinclude = require('gulp-file-include');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/argon-design-system.scss',
  SCSS: './assets/scss/**/**'
};

gulp.task('compile-html', function() {
  return gulp.src([
    './**/*.html',
    './**/config-title-meta.json',
    '!header.html', // ignore
    '!footer.html', // ignore
    '!./node_modules/**'
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./pre-build'));
});

gulp.task('compile-scss', function() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest('./pre-build/assets'));
});

gulp.task('build-html', function () {
  return gulp.src('./pre-build/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'))
});

gulp.task('build-css', function() {
  return gulp.src('./assets/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build/assets'))
});

gulp.task('build-js', function() {
  return gulp.src('./assets/**/*.js')
    .pipe(minify())
    .pipe(gulp.dest('./build/assets'))
});