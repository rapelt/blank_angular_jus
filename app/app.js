'use strict';

angular
  .module('jusCafeApp', [
    'breadcrumbs',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'ngTouch',
    'home',
    'appConfig'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'features/home/home.html',
        controller: 'HomeController'
      })
  })
  .run(function ($rootScope, buildNumber) {
    $rootScope.buildNumber = buildNumber;
  });
