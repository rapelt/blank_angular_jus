'use strict';

angular.module('AblisData', [])
.factory('ResultsService', function($http){
  return {
    get: function(){
      return $http.get('../resources/results.json');
    }
  };
});
