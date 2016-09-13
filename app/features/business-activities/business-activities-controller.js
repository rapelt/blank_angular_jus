'use strict';

angular.module('businessActivities', ['businessActivitiesStorage'])
  .controller('BusinessActivitiesController', function ($rootScope, $scope, $state, BusinessActivities) {
    $scope.businessActivities = BusinessActivities.getValues();

    $scope.showNextPage = function () {
      $state.go('location');
    };

    $scope.isNextButtonEnabled = function () {
      return BusinessActivities.isModified();
    };
  });
