/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/
"use strict";
var ts = require('gulp-typescript');

var gulp = require('gulp'),
 rimraf = require('rimraf'), //A Node deletion module
concat = require("gulp-concat"), //A module that will concatenate files based on the operating system’s newline character.
cssmin = require("gulp-cssmin"), //A module that will minify CSS files.
uglify = require("gulp-uglify"); // A module that minifies .js files using the UglifyJS toolkit



var paths = {
    webroot: "./wwwroot/"
};
paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";








gulp.task('clean', function (cb) {
    return rimraf('./wwwroot/lib1/', cb)
});
gulp.task('copy:lib', function () {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**'
    ], { cwd: "node_modules/**" })
        .pipe(gulp.dest('./wwwroot/lib1'));
});
var tsProject = ts.createProject('Scripts/tsconfig.json', {
    typescript: require('typescript')
});
//gulp.task('ts', function (done) {
//    //var tsResult = tsProject.src()
//    var tsResult = gulp.src([
//            "Scripts/**/*.ts"
//    ])
//        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
//    return tsResult.js.pipe(gulp.dest('./wwwroot/app'));
//});
gulp.task('ts', function () {
    var tsResult = gulp.src("Scripts/**/*.ts") // instead of gulp.src(...)
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('./wwwroot'));
});

gulp.task('html', function () {
    return gulp.src("Scripts/**/*.html").pipe(gulp.dest('./wwwroot'));
});
gulp.task('css', function () {
    return gulp.src("Scripts/**/*.css").pipe(gulp.dest('./wwwroot'));
});
gulp.task('jpg', function () {
    return gulp.src("Scripts/**/*.jpg").pipe(gulp.dest('./wwwroot'));
});

gulp.task('watch', ['watch.ts', 'htmlWatch.ts', 'cssWatch.ts', 'jpgWatch.ts']);

gulp.task('watch.ts', ['ts'], function () {
    return gulp.watch('Scripts/**/*.ts', ['ts']);
});
gulp.task('htmlWatch.ts', ['html'], function () {
    return gulp.watch('Scripts/**/*.html', ['html']);
});
gulp.task('cssWatch.ts', ['css'], function () {
    return gulp.watch('Scripts/**/*.css', ['css']);
});
gulp.task('jpgWatch.ts', ['jpg'], function () {
    return gulp.watch('Scripts/**/*.jpg', ['jpg']);
});

gulp.task('default', ['watch']);