'use strict';

angular.module('LocationRepository', [])
  .factory('LocationRepository', function ($http) {
    return {
      getBrisbaneLocation: function(){
        return $http.get('../resources/brisbane.json');
      },
      getLoganLocation: function(){
        return $http.get('../resources/logan.json');
      }
    };
  });
