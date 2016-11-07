var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var removeUseStrict = require("gulp-remove-use-strict");

gulp.task('default', ['concat-uglify-js', 'concat-min-css']);

gulp.task('concat-uglify-js', function () {
    return gulp.src(
        [
            //EXTERNAL PLUGINS
            './scripts/jquery/jquery-3.1.1.js',
            './scripts/bootstrap/bootstrap.js',
            './scripts/sweetalert/sweetalert.js',
            './scripts/datatables/datatables.js',
            './scripts/datatables/dataTables.bootstrap.js',
            //ANGULAR
            './scripts/angular/angular.js',
            './scripts/angular/angular-ui-router.js',
            './scripts/angular/angular-animate.js',
            './scripts/angular/angular-touch.js',
            './scripts/angular/angular-ui-bootstrap-tpls-2.2.0.js',
            './scripts/angular/angular-validator.js',
            './scripts/angular/angular-local-storage.js',
            './scripts/angular/angular-sweetalert.js',
            './scripts/angular/angular-http-loader.js',
            './scripts/angular/angular-datatables.js',
            //APP
            './app/app.js',
            './app/app.core.js',
            './app/app.config.js',
            './app/app.run.js',
            './app/app.settings.js',
            //FINAL SHIT
            './app/helpers/*.js',
            './app/services/*.js',
            './app/layout/*.js',
            './app/pages/**/*.js',
        ]
    )
    .pipe(concat('xpao.min.js'))
    //.pipe(removeUseStrict())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('concat-min-css', function () {
    return gulp.src(['./css/**/*.css'])
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS({ compatibility: 'ie9' }))
    .pipe(gulp.dest('./dist/'));
});