'use strict';

angular
  .module('jusCafeApp', [
    'breadcrumbs',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'ngTouch',
    'results',
    'serviceDetails',
    'questions',
    'questionsService',
    'locationRepository',
    'locationService',
    'locationStorage',
    'location',
    'businessActivities',
    'businessActivitiesStorage',
    'serviceFilters',
    'appConfig',
    'smoothScroll',
    'home'
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
          brisbane: function (LocationRepository) {
            return LocationRepository.getBrisbaneLocation();
          },
          logan: function (LocationRepository) {
            return LocationRepository.getLoganLocation();
          },
          valley: function (LocationRepository) {
            return LocationRepository.getValleyLocation();
          }
        }
      })
      .state('questions', {
        url: '/questions',
        templateUrl: 'features/questions/questions.html',
        controller: 'QuestionsController'
      })
      .state('business-activities', {
        url: '/business-activities',
        templateUrl: 'features/business-activities/business-activities.html',
        controller: 'BusinessActivitiesController'
      })
      .state('home', {
        url: '/',
        templateUrl: 'features/home/home.html',
        controller: 'HomeController'
      })
      .state('service-details', {
        url: '/service-details',
        templateUrl: 'features/service-details/service-details.html',
        controller: 'ServiceDetailsController'
      });
  })
  .run(function ($rootScope, buildNumber) {
    $rootScope.buildNumber = buildNumber;
  });
