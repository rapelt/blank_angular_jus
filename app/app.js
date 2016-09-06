'use strict';

angular
  .module('jusCafeApp', [
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'ngTouch',
    'Questions',
    'Results',
    'ResultsService',
    'QuestionsService',
    'Business-types',
    'QuestionsRepository',
    'LocationRepository',
    'Location',
    'Business-types',
    'ServiceFilters',
    'appConfig',
    'smoothScroll'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('results', {
        url: '/results',
        template: '<div results></div>',
        controller: 'ResultsController'
      })
      .state('location', {
        url: '/location',
        templateUrl: 'features/location/location.html',
        controller: 'LocationController',
        resolve: {
          brisbane: function (LocationRepository){
            return LocationRepository.getBrisbaneLocation();
          },
          logan: function(LocationRepository){
            return LocationRepository.getLoganLocation();
          }
        }
      })
      .state('questions', {
        url: '/questions',
        templateUrl: 'features/questions/questions.html',
        controller: 'QuestionsController'
      })
      .state('business-types', {
        url: '/',
        templateUrl: 'features/business-types/business-types.html',
        controller: 'BusinessTypesController'
      });
  })
  .run(function ($rootScope, buildNumber) {
    $rootScope.buildNumber = buildNumber;
  });
