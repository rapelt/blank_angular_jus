'use strict';

angular.module('Business-types', [])
  .controller('BusinessTypesController', function($scope, $state){
    $scope.showNextPage = function () {
      $state.go('questions');
    };
  });
