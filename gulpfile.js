'use strict'

const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concat = require('gulp-concat-css');

function fromLess () {
    return gulp.src(['./styles/styles.less', './styles/adaptive.less'])
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./src/'))
}

exports.default = fromLess;


const jsmin = require('gulp-jsmin');

gulp.task('new', function () {
    return gulp.src('scripts/script.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/script/'));
});


exports.watch = function() {
    gulp.watch(['styles/styles.less', 'styles/adaptive.less', 'scripts/script.js'], gulp.series('default'));
}