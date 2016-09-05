'use strict';

angular.module('Results', [])
  .controller('ResultsController', function ($scope, ResultsService) {
    ResultsService.get().then(function (response) {
      $scope.serviceGroups = response.data.map(function (serviceGroup) {
        serviceGroup.expanded = false;
        serviceGroup.toggleExpanded = function () {
          serviceGroup.expanded = !serviceGroup.expanded;
        };
        return serviceGroup;
      });
    });
  });
