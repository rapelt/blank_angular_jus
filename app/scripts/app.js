'use strict';

angular
  .module('ossCafeApp', [
    'ngResource',
    'ui.router',
    'AblisData'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: "MainCtrl"
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      });
  });
