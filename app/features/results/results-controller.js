'use strict';

angular.module('ossCafeApp')
.controller('ResultsController', function(AblisDataService, $scope){
  AblisDataService.getResults().then(function(response){
    $scope.serviceGroups = response.data.map(function(serviceGroup){
      serviceGroup.expanded = false;
      serviceGroup.toggleExpanded = function(){
        serviceGroup.expanded = !serviceGroup.expanded;
      }
      return serviceGroup;
    });
  });
});
