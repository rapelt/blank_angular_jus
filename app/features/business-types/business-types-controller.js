'use strict';

angular.module('Business-types', ['businessActivities'])
  .controller('BusinessTypesController', function ($rootScope, $scope, $state, BusinessActivities) {
    $rootScope.businessActivities = BusinessActivities.getAnswers();

    $scope.showNextPage = function () {
      $state.go('questions');
    };

    $scope.isNextButtonEnabled = function () {
      return $rootScope.businessActivities.cafe || $rootScope.businessActivities.mobile || $rootScope.businessActivities.takeaway;
    };
  });
