const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// Compile scss into css

function style() {
  // 1. Where is my scss file?
  return (
    gulp
      .src('./scss/**/*.scss')
      // 2. Pass the scss file through compiler
      .pipe(sass().on('error', sass.logError))
      // 3. Where do I save the compiled css file?
      .pipe(gulp.dest('./css'))
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(gulp.dest('./css/'))
      // 4. Stream changes to all browsers
      .pipe(browserSync.stream())
  );
}

function watch() {
  // 5. Watch files and folders for changes and run all above functions
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
