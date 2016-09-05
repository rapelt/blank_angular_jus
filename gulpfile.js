// Generated on 2016-08-18 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var angularProtractor = require('gulp-angular-protractor');
var Server = require('karma').Server;

var yeoman = {
  app: 'app',
  dist: 'dist'
};

var paths = {
  scripts: [yeoman.app + '/app.js', yeoman.app + '/features/**/*.js'],
  styles: [yeoman.app + '/features/**/*.scss'],
  test: ['test/features/**/*.js', 'E2E/**/*.js'],
  views: {
    main: yeoman.app + '/index.html',
    error: yeoman.app + '/404.html',
    files: [yeoman.app + '/features/**/*.html']
  }
};

// //////////////////////
// Reusable pipelines //
// //////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
  .pipe($.sass, {
    outputStyle: 'expanded',
    precision: 10
  })
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/styles');

function runProtractor (protractorConfig) {
  return gulp.src(['./E2E/spec/**/*.js'])
    .pipe(angularProtractor(protractorConfig))
    .on('error', function (e) {
      process.exit(1);
    })
    .on('end', function (e) {
      $.connect.serverClose();
      process.exit(0);
    });
}
// /////////
// Tasks //
// /////////

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(styles());
});

gulp.task('lint', function () {
  return gulp.src(paths.scripts.concat(paths.test))
    .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'styles'], function () {
  openURL('http://localhost:9000');
});

gulp.task('start:server', function () {
  $.connect.server({
    root: [yeoman.app, '.tmp'],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000
  });
});

gulp.task('start:server:test', function () {
  $.connect.server({
    root: ['test', yeoman.app, '.tmp'],
    livereload: true,
    port: 9001
  });
});

gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    .pipe($.connect.reload());

  $.watch(paths.test)
    .pipe($.plumber())
    .pipe(lintScripts());

  gulp.watch('bower.json', ['bower']);
});

gulp.task('serve', function (cb) {
  runSequence('clean:tmp',
    ['lint'],
    ['start:client'],
    ['styles'],
    'watch', cb);
});

gulp.task('serve:prod', function () {
  $.connect.server({
    root: [yeoman.dist],
    livereload: true,
    port: 7000
  });
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/test/karma.conf.js',
  }, done).start();
});

gulp.task('testci', function (done) {
  new Server({
    configFile: __dirname + '/test/karma.conf.js',
    colors: false,
    reporters: ['coverage', 'junit']
  }, done).start();
});

gulp.task('e2e-phantom', ['start:server:test'], function (cb) {
  runProtractor({
    'configFile': './E2E/conf.js',
    'autoStartStopServer': true,
    'debug': false
  });
});

gulp.task('e2e', ['start:server:test', 'lint'], function (cb) {
  runProtractor({
    'configFile': './E2E/conf.js',
    'autoStartStopServer': true,
    'debug': false,
    'args': [
      '--chromeOnly', true,
      '--directConnect', true,
      '--capabilities.browserName', 'chrome',
      '--capabilities.chromeOptions.args', '--disable-extensions'
    ]
  });
});

// inject bower components
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory: yeoman.app + '/bower_components',
      ignorePath: '..'
    }))
    .pipe(gulp.dest(yeoman.app + '/views'));
});

// /////////
// Build //
// /////////

gulp.task('clean:dist', function (cb) {
  rimraf('./dist', cb);
});

gulp.task('client:build', ['html', 'images'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter(['.tmp/styles/main.css', 'app/bower']);
  // css,js,images, and views, not index.html or 404.html
  var assetFilter = $.filter(['**/*.*', '!*.html']);

  return gulp.src([paths.views.main, paths.views.error])
    .pipe($.useref({searchPath: [yeoman.app, '.tmp']}))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe(cssFilter.restore())
    .pipe(assetFilter)
    .pipe($.rev())
    .pipe(assetFilter.restore())
    .pipe($.revReplace())
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('html', function () {
  return gulp.src(yeoman.app + '/views/**/*')
    .pipe(gulp.dest(yeoman.dist + '/views'));
});

gulp.task('images', function () {
  return gulp.src(yeoman.app + '/resources/images/**/*')
    .pipe(gulp.dest(yeoman.dist + '/resources/images'));
});

gulp.task('copy:extras', function () {
  return gulp.src(yeoman.app + '/*/.*', { dot: true })
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('copy:swe-templates', function () {
  return gulp.src(yeoman.app + '/bower_components/glue-swe-template/assets/includes/**')
    .pipe(gulp.dest(yeoman.dist + '/bower_components/glue-swe-template/assets/includes'));
});

gulp.task('copy:ng-templates', function () {
  return gulp.src(yeoman.app + '/features/**/*.html')
    .pipe(gulp.dest(yeoman.dist + '/features/'));
});

gulp.task('copy:json', function () {
  return gulp.src(yeoman.app + '/resources/*.json')
    .pipe(gulp.dest(yeoman.dist + '/resources/'));
});

gulp.task('copy:fonts', function () {
  return gulp.src(yeoman.app + '/bower_components/glue-swe-template/assets/v3/fonts/**')
    .pipe(gulp.dest(yeoman.dist + '/fonts'));
});

gulp.task('copy:fontAwesome', function () {
  return gulp.src(yeoman.app + '/bower_components/glue-swe-template/assets/v3/lib/**')
    .pipe(gulp.dest(yeoman.dist + '/lib'));
});

gulp.task('build', ['clean:dist', 'styles'], function () {
  runSequence(['images', 'copy:extras', 'copy:fonts', 'copy:json', 'copy:fontAwesome', 'copy:swe-templates', 'copy:ng-templates', 'client:build']);
});

gulp.task('default', ['build']);
