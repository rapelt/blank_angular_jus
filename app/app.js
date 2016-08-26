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
        templateUrl: 'features/home/main.html',
        controller: "MainCtrl"
      })
      .state('about', {
        url: '/about',
        templateUrl: 'features/home/about.html',
        controller: 'AboutCtrl'
      });
  });
