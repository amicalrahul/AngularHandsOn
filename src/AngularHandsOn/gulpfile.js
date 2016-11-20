/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/
var ts = require('gulp-typescript');

var gulp = require('gulp'),
 rimraf = require('rimraf');

gulp.task('clean', function (cb) {
    return rimraf('./wwwroot/lib1/', cb)
});

gulp.task('copy:lib', function () {
    return gulp.src('node_modules/**/*')
        .pipe(gulp.dest('./wwwroot/lib1/'));
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

gulp.task('watch', ['watch.ts']);
gulp.task('watch.ts', ['ts'], function () {
    return gulp.watch('Scripts/**/*.ts', ['ts']);
});

gulp.task('default', ['watch']);