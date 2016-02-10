var gulp = require('gulp');
var Server = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test_ch25', function (done) {
    new Server({
        configFile: __dirname + '/Chapter 25/karma.config.js',
        singleRun: true
    }, done).start();
});

gulp.task('test_app', function (done) {
    new Server({
        configFile: __dirname + '/angularjs-docs-api/ng-directive-ngController/karma.config.js',
        singleRun: true
    }, done).start();
});

gulp.task('test_all', function (done) {
    new Server({
        configFile: __dirname + '/karma.config.js',
        singleRun: true
    }, done).start();
});

gulp.task('test_jasmine_docs', function (done) {
    new Server({
        configFile: __dirname + '/jasmine-docs/karma.config.js',
        singleRun: true
    }, done).start();
});

gulp.task('test_simple_highcharts_directive', function (done) {
    new Server({
        configFile: __dirname + '/simple-highcharts-directive/karma.config.js',
        singleRun: true
    }, done).start();
});

gulp.task('test_mocks_in_jasmine_tests', function (done) {
    new Server({
        configFile: __dirname + '/mocks-in-jasmine-tests/karma.config.js',
        singleRun: true
    }, done).start();
});

gulp.task('test_request_queue', function (done) {
    new Server({
        configFile: __dirname + '/request-queue/karma.config.js',
        singleRun: true
    }, done).start();
});
gulp.task('test_scope_watch', function (done) {
    new Server({
        configFile: __dirname + '/testing-scope-watch/karma.config.js',
        singleRun: true
    }, done).start();
});
/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd_ch25', function (done) {
    new Server({
        configFile: __dirname + '/Chapter 25/karma.config.js'
    }, done).start();
});

gulp.task('tdd_app', function (done) {
    new Server({
        configFile: __dirname + '/angularjs-docs-api/ng-directive-ngController/karma.config.js'
    }, done).start();
});

gulp.task('tdd_all', function (done) {
    new Server({
        configFile: __dirname + '/karma.config.js'
    }, done).start();
});

gulp.task('tdd_jasmine_docs', function (done) {
    new Server({
        configFile: __dirname + '/jasmine-docs/karma.config.js'
    }, done).start();
});

gulp.task('tdd_simple_highcharts_directive', function (done) {
    new Server({
        configFile: __dirname + '/simple-highcharts-directive/karma.config.js'
    }, done).start();
});
gulp.task('tdd_request_queue', function (done) {
    new Server({
        configFile: __dirname + '/request-queue/karma.config.js',
    }, done).start();
});

// gulp.task('default', ['tdd']);
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        files: "index.html",
        logLevel: "debug"
    });
});

// Minify and header examples are inspired by http://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/
// including plugins
var minifyHtml = require("gulp-minify-html");
var header = require("gulp-header");

// Get copyright using NodeJs file system
var getCopyright = function () {
    //return fs.readFileSync('Copyright');
    return "<!-- Hello, Header! -->\n";
};

// task
gulp.task('minify-html', function () {
    gulp.src('./typeahead/*.html') // path to your files
        .pipe(minifyHtml())
        .pipe(header(getCopyright()))
        .pipe(gulp.dest('.tmp'));
});

gulp.task('protractor', function() {
    var protractor = require("gulp-protractor").protractor;

    gulp.src(["./protractor/spec.js"])
        .pipe(protractor({
            configFile: "./protractor/conf.js",
            //args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', function(e) { throw e })
});

gulp.task('protractor-uib-tooltip-demo', function() {
    var protractor = require("gulp-protractor").protractor;
    gulp.src(["./uib-tooltip-demo/spec.js"])
        .pipe(protractor({
            configFile: "./uib-tooltip-demo/conf.js",
        }))
        .on('error', function(e) { throw e })
});

gulp.task('protractor-uib-typeahead-demo', function() {
    var protractor = require("gulp-protractor").protractor;
    gulp.src(["./uib-typeahead-demo/spec.js"])
        .pipe(protractor({
            configFile: "./uib-typeahead-demo/conf.js",
        }))
        .on('error', function(e) { throw e })
});
gulp.task('protractor-blob-download', function() {
    var protractor = require("gulp-protractor").protractor;
    gulp.src(["./blob-download/spec.js"])
        .pipe(protractor({
            configFile: "./blob-download/conf.js",
        }))
        .on('error', function(e) { throw e })
});
