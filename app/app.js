'use strict';

angular
  .module('ossCafeApp', [
    'ngResource',
    'ui.router',
    'AblisData',
    'Questions'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'features/home/main.html',
        controller: "MainController"
      })
      .state('results', {
        url: '/results',
				template: '<div results></div>',
        controller: 'ResultsController'
      })
      .state('questions', {
        url: '/questions',
        templateUrl: 'features/questions/questions.html',
        controller: 'QuestionsController'
      });
  });
