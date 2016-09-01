'use strict';

angular
  .module('ossCafeApp', [
    'ngResource',
    'ui.router',
    'Questions',
    'Results',
    'ResultsService',
    'QuestionsService',
    'Business-types',
    'QuestionsRepository'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('results', {
        url: '/results',
				template: '<div results></div>',
        controller: 'ResultsController'
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
  });
