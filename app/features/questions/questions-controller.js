'use strict';

angular.module('Questions', [])
  .controller('QuestionsController', function ($scope, $state, $rootScope, QuestionsService) {
    $scope.ablisQuestions = "";
    $scope.page =  0;
    $rootScope.qanswers = $rootScope.qanswers || {};

    QuestionsService.get().then(function(response){
      $scope.ablisData = response.data;
    });

    $scope.showNextPage = function () {
      if($scope.page < 1){
        $scope.page =  $scope.page + 1;
      } else {
        $state.go('results');
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
