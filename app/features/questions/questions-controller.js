'use strict';

angular.module('Questions', [])
  .controller('QuestionsController', function ($scope, AblisDataService) {
    $scope.ablisQuestions = "";

    AblisDataService.getQuestions().then(function(response){
      $scope.ablisQuestions = response.data;
    });
  });
