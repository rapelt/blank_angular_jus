module.exports = function (config) {
  'use strict';

  config.set({
    autoWatch: true,

    basePath: '../',

    preprocessors: {
      'app/features/**/!(*repository).js': 'coverage',
      'app/features/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app',
      moduleName: 'templates'
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'reports/coverage/', subdir: '.' },
        { type: 'text-summary' }
      ],

      check: {
        global: {
          statements: 79,
          branches: 60,
          functions: 69,
          lines: 80
        }
      }
    },

    junitReporter: {
      outputDir: 'reports/karma',
      suite: '',
      useBrowserName: false
    },

    frameworks: [
      'jasmine'
    ],

    files: [
      './app/bower_components/angular/angular.js',
      './app/bower_components/angular-mocks/angular-mocks.js',
      './app/bower_components/angular-resource/angular-resource.js',
      './app/bower_components/angular-sanitize/angular-sanitize.js',
      './app/bower_components/angular-ui-router/release/angular-ui-router.js',
      './app/bower_components/angular-bootstrap/ui-bootstrap.js',
      './app/bower_components/ngSmoothScroll/lib/angular-smooth-scroll.js',
      './app/bower_components/angular-animate/angular-animate.js',
      './app/bower_components/angular-touch/angular-touch.js',
      './app/bower_components/underscore/underscore.js',
      'https://maps.googleapis.com/maps/api/js?v=3.23&libraries=geometry,places',
      './app/app.js',
      './app/features/**/*.html',
      './app/features/**/*.js',
      './test/features/**/*.js'
    ],

    exclude: [],

    port: 8080,

    browsers: [
      'PhantomJS'
    ],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor',
      'karma-jasmine',
      'karma-coverage',
      'karma-junit-reporter'
    ],

    singleRun: true,

    colors: true,

    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

  });
};
