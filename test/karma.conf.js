
module.exports = function(config) {
  'use strict';

  config.set({
    autoWatch: true,

    basePath: '../',

    frameworks: [
      'jasmine'
    ],

    files: [
      './app/bower_components/angular/angular.js',
      './app/bower_components/angular-mocks/angular-mocks.js',
      './app/bower_components/angular-resource/angular-resource.js',
      './app/bower_components/angular-ui-router/release/angular-ui-router.js',
      './app/scripts/**/*.js',
      './test/spec/**/*.js'
    ],

    exclude: [
    ],

    port: 8080,

    browsers: [
      'PhantomJS'
    ],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],

    preprocessors: {
      'app/scripts/**/*.js': 'coverage'
    },

    reporters: ['progress', 'coverage'],

    coverageReporter:{
      type : 'html',
      dir : 'coverage/'
    },

    singleRun: true,

    colors: true,

    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

  });
};
