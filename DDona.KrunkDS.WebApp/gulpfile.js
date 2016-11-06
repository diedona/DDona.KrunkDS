var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task('default', ['concat-uglify-js', 'concat-min-css']);

gulp.task('concat-uglify-js', function () {
    return gulp.src(['./scripts/**/*.js', './app/**/*.js'])
    .pipe(concat('xpao.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('concat-min-css', function () {
    return gulp.src(['./css/**/*.css'])
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS({ compatibility: 'ie9' }))
    .pipe(gulp.dest('./dist/'));
});