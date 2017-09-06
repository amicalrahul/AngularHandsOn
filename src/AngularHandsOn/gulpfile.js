///// <binding BeforeBuild='wiredep' />
///*
//This file in the main entry point for defining Gulp tasks and using Gulp plugins.
//Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
//*/
//"use strict";
//var ts = require('gulp-typescript');

//var gulp = require('gulp'),
// rimraf = require('rimraf'), //A Node deletion module
//concat = require("gulp-concat"), //A module that will concatenate files based on the operating system’s newline character.
//cssmin = require("gulp-cssmin"), //A module that will minify CSS files.
//uglify = require("gulp-uglify"); // A module that minifies .js files using the UglifyJS toolkit

//var args = require('yargs').argv;
//var $ = require('gulp-load-plugins')({ lazy: true });
//var config = require('./gulp.config.js')();

////var jscs = require('gulp-jscs');
////var jshint = require('gulp-jshint');
////var util = require('gulp-util');
////var gulpprint = require('gulp-print');
////var gulpif = require('gulp-if');

//var paths = {
//    webroot: "./wwwroot/"
//};
//paths.js = paths.webroot + "js/**/*.js";
//paths.minJs = paths.webroot + "js/**/*.min.js";
//paths.css = paths.webroot + "css/**/*.css";
//paths.minCss = paths.webroot + "css/**/*.min.css";
//paths.concatJsDest = paths.webroot + "js/site.min.js";
//paths.concatCssDest = paths.webroot + "css/site.min.css";




//gulp.task('build-specs', ['copy:testLib'], function () {
//    log('building the spec runner');

//    var wiredep = require('wiredep').stream;
//    var options = config.getWiredepDefaultOptions();
//    var specs = config.specs;

//    options.devDependencies = true;

//    if (args.startServers) {
//        specs = [].concat(specs, config.serverIntegrationSpecs);
//    }
//    var injectOptions = config.getInjectOptions();

//    return gulp
//        .src(config.specRunner)
//        .pipe(wiredep(options))
//        .pipe($.inject(gulp.src(config.testlibraries),
//            { name: 'inject:testlibraries', read: false, ignorePath: config.bower.ignorePath }))
//        .pipe($.inject(gulp.src(config.js), injectOptions))
//        .pipe($.inject(gulp.src(config.specHelpers),
//            { name: 'inject:spechelpers', read: false, ignorePath: config.bower.ignorePath }))
//        .pipe($.inject(gulp.src(specs),
//            { name: 'inject:specs', read: false, ignorePath: config.bower.ignorePath }))
//        //.pipe($.inject(gulp.src(config.temp + config.templateCache.file),
//        //    { name: 'inject:templates', read: false }))
//        .pipe(gulp.dest(config.client));
//});



//gulp.task("vet", function () {
//    log("Analyzing the source code");
//    return gulp
//            .src(config.bookappjs)
//            .pipe($.if(args.verbose, $.print()))
//            .pipe($.jscs())
//            .pipe($.jshint())
//            .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
//            .pipe($.jshint.reporter('fail'));

//});
//gulp.task('wiredep', function () {
//    log("wiredep the source code");
//    var options = config.getWiredepDefaultOptions();
//    var wiredep = require('wiredep').stream;
//    var injectOptions = config.getInjectOptions();

//    return gulp
//            .src(config.index)
//            .pipe(wiredep(options))
//            .pipe($.inject(gulp.src(config.js), injectOptions))
//            .pipe($.inject(gulp.src(config.css), injectOptions))
//            .pipe(gulp.dest(config.scriptLoc));
//});


////Here cb is for callback function
////it means if I use 'clean' task as a dependency to some other task, 
////it makes sure to call the another task once clean is finished
//gulp.task('clean', function (cb) {
//    return rimraf('./wwwroot/lib1/', cb);
//});


////here, cwd - is for current working directory
//gulp.task('copy:lib', ['clean'], function () {
//    return gulp.src(config.angular2Lib, { cwd: "node_modules/**" })
//        .pipe(gulp.dest('./wwwroot/lib1'));
//});
////here, cwd - is for current working directory
//gulp.task('copy:testLib', function () {
//    return gulp.src(config.nodeTestlibraries, { cwd: "node_modules/**" })
//        .pipe(gulp.dest('./wwwroot/lib'));
//});
//var tsProject = ts.createProject('Scripts/tsconfig.json', {
//    typescript: require('typescript')
//});
//gulp.task('ts', function () {
//    var tsResult = gulp.src(config.scriptsTs) // instead of gulp.src(...)
//        .pipe(tsProject());

//    return tsResult.js.pipe(gulp.dest('./wwwroot'));
//});

//gulp.task('copy:ang2App', function () {
//    return gulp
//        .src(config.angular2Code)
//        .pipe(gulp.dest('./wwwroot'));
//});

//gulp.task('watch.ts', ['ts'], function () {
//    return gulp.watch(config.scriptsTs, ['ts']);
//});
//gulp.task('watch:ang2App', ['copy:ang2App'], function () {
//    return gulp.watch(config.angular2Code, ['copy:ang2App']);
//});

//gulp.task('watch', ['watch.ts', 'watch:ang2App']);
//gulp.task('default', ['watch']);


//gulp.task('test', [], function (done) {
//    startTests(true /* singleRun */, done);
//});

//gulp.task('autotest', [], function (done) {
//    startTests(false /* singleRun */, done);
//});
//////////////

//function startTests(singleRun, done) {
//    var karmaServer = require('karma').Server;
//    var excludeFiles = [];
//    var serverSpecs = config.serverIntegrationSpecs;

//    var child;
//    /* This section will crank up the node server to run tests that requires server apis to return real data
//    ** As, we are using IISExpress MVC.net Core, so this is not applicable for this app
//    var fork = require('child_process').fork;
//    if (args.startServers) { // gulp test --startServers
//        log('Starting server');
//        var savedEnv = process.env;
//        savedEnv.NODE_ENV = 'dev';
//        savedEnv.PORT = 8888;
//        child = fork(config.nodeServer);
//    } else {
//        if (serverSpecs && serverSpecs.length) {
//            excludeFiles = serverSpecs;
//        }
//    }*/

//    var karmaConfig = {
//        configFile: __dirname + '/karma.conf.js',
//        exclude: excludeFiles,
//        singleRun: !!singleRun
//    };

//    excludeFiles = serverSpecs;

//    var karma = new karmaServer(karmaConfig, karmaCompleted);
//    karma.start();

//    function karmaCompleted(karmaResult) {
//        log('Karma completed!');
//        if (child) {
//            log('Shutting down the child process');
//            child.kill();
//        }
//        if (karmaResult === 1) {
//            done('karma: tests failed with code ' + karmaResult);
//        } else {
//            done();
//        }
//    }

//}

//function log(msg) {
//    if (typeof (msg) === 'object') {
//        for (var item in msg) {
//            if (msg.hasOwnProperty(item)) {
//                $.util.log($.util.colors.blue(msg[item]));
//            }
//        }
//    } else {
//        $.util.log($.util.colors.blue(msg));
//    }
//}