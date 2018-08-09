const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const bs = require('browser-sync').create();

gulp.task('browser-sync', ['sass'], function () {
  bs.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('sass', function () {
  return gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('css'))
    .pipe(bs.reload({
      stream: true
    }));
});

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('*.html').on('change', bs.reload);
});
