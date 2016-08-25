angular.module('ossCafeApp')
.controller('ResultsController', function(AblisDataService, $scope){
  AblisDataService.getResults().then(function(response){
    $scope.serviceGroups = response.data;
  }); 
});