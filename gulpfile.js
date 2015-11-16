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
