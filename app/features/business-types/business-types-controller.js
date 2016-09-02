'use strict';

angular.module('Business-types', [])
  .controller('BusinessTypesController', function($rootScope, $scope, $state){
    $rootScope.businessActivities = $rootScope.businessActivities ? $rootScope.businessActivities : {
      cafe: false,
      mobileFood: false,
      takeaway: true
    };



    $scope.showNextPage = function () {
      $state.go('questions');
    };

    $scope.isNextButtonEnabled = function () {
      return $rootScope.businessActivities.cafe || $rootScope.businessActivities.mobileFood || $rootScope.businessActivities.takeaway;
    }
  });
