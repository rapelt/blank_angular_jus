'use strict';

angular.module('Questions', [])
  .controller('QuestionsController', function ($scope, $state, $rootScope, QuestionsService) {
    //Set business activities all to true if busniessActivities is undefined
    $rootScope.businessActivities = $rootScope.businessActivities ? $rootScope.businessActivities : {
      cafe: true,
      mobileFood: true,
      takeaway: true
    };

    $scope.ablisQuestions = "";
    $scope.page =  0;
    $rootScope.qanswers = $rootScope.qanswers || {};
    $scope.group_id = "groupid1";
    $scope.ablisData = {};

    QuestionsService.getQuestions().then(function(response){
      $scope.ablisData = response;
      $scope.$evalAsync();
      console.log("ablisdata", $scope.ablisData);
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
