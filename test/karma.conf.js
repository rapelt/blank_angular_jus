
module.exports = function(config) {
  'use strict';

  config.set({
    autoWatch: true,

    basePath: '../',

    preprocessors: {
      'app/features/**/*.js': 'coverage'
    },

    reporters: ['dots','progress','coverage'],

    coverageReporter:{
      type : 'clover',
      dir : 'coverage/'
    },

    frameworks: [
      'jasmine'
    ],

    files: [
      './app/bower_components/angular/angular.js',
      './app/bower_components/angular-mocks/angular-mocks.js',
      './app/bower_components/angular-resource/angular-resource.js',
      './app/bower_components/angular-ui-router/release/angular-ui-router.js',
      './app/app.js',
      './app/features/**/*.html',
      './app/features/**/*.js',
      './test/features/**/*.js'
    ],

    exclude: [
    ],

    port: 8080,

    browsers: [
      'PhantomJS'
    ],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor',
      'karma-jasmine',
      'karma-coverage'
    ],

    preprocessors: {
      'app/features/**/*.js': 'coverage'
    },

    reporters: ['dots','progress', 'coverage'],

    coverageReporter:{
      type : 'clover',
      dir : 'coverage/',
      subdir: '.'
    },

    singleRun: true,

    colors: true,

    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

  });
};
