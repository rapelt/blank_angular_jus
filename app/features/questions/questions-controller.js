'use strict';

angular.module('Questions', [])
  .controller('QuestionsController', function ($scope, AblisDataService) {
    $scope.ablisQuestions = "";
    $scope.page =  0;

    AblisDataService.getQuestions().then(function(response){
      $scope.ablisData = response.data;
    });
  });
