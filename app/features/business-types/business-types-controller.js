'use strict';

angular.module('Business-types', [])
  .controller('BusinessTypesController', function($rootScope, $scope, $state){
    $rootScope.cafe = $rootScope.cafe ? $rootScope.cafe : false;
    $rootScope.mobileFood = $rootScope.mobileFood ? $rootScope.mobileFood : false;
    $rootScope.takeaway = $rootScope.takeaway ? $rootScope.takeaway : false;

    $scope.showNextPage = function () {
      $state.go('questions');
    };

    $scope.isNextButtonEnabled = function () {
      return $rootScope.cafe || $rootScope.mobileFood || $rootScope.takeaway;
    }
  });
