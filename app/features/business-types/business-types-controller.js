'use strict';

angular.module('Business-types', [])
  .controller('BusinessTypesController', function($scope, $state){
    $scope.cafe = false;
    $scope.mobileFood = false;
    $scope.takeaway = false;

    $scope.showNextPage = function () {
      $state.go('questions');
    };
  });
