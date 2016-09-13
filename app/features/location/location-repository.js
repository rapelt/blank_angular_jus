'use strict';

angular.module('locationRepository', [])
  .factory('LocationRepository', function ($http) {
    return {
      getBrisbaneLocation: function () {
        return $http.get('../resources/brisbane.json');
      },
      getLoganLocation: function () {
        return $http.get('../resources/logan.json');
      },
      getValleyLocation: function () {
        return $http.get('../resources/valley.json');
      }
    };
  });
