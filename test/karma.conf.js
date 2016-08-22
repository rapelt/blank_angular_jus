// Karma configuration
// Generated on 2016-08-18

module.exports = function(config) {
  'use strict';

  config.set({
    autoWatch: true,

    basePath: '../',

    preprocessors: {
      'app/scripts/**/*.js': 'coverage'
    },

    reporters: ['coverage'],

    coverageReporter:{
      type : 'html',
      dir : 'coverage/'
    },

    frameworks: [
      'jasmine'
    ],

    files: [
      // bower:js
      // endbower
      './app/bower_components/angular/angular.js',
      './app/bower_components/angular-mocks/angular-mocks.js',
      './app/bower_components/angular-resource/angular-resource.js',
      './app/bower_components/angular-route/angular-route.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
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

    singleRun: true,

    colors: true,

    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

  });
};
