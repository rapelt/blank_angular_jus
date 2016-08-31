'use strict';

angular.module('Questions', [])
  .controller('QuestionsController', function ($scope, $state, $rootScope, AblisDataService) {
    $scope.ablisQuestions = "";
    $scope.page =  0;
    $rootScope.qanswers = $rootScope.qanswers || {};

    AblisDataService.getQuestions().then(function(response){
      $scope.ablisData = response.data;
    });

    $scope.showNextPage = function () {
      if($scope.page < 1){
        $scope.page =  $scope.page + 1;
      }
    };

    $scope.showPreviousPage = function () {
      if($scope.page > 0){
        $scope.page =  $scope.page - 1;
      } else {
        $state.go('business-types');
      }
    }
  });
