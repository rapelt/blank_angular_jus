'use strict';

angular.module('AblisData', [])
.factory('AblisDataService', function($http){
  return {
    getResults: function(){
      return $http.get('../resources/results.json');
    }
  };
});