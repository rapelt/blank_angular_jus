'use strict';

angular.module('ResultsService', [])
  .factory('ResultsService', function ($http) {
    return {
      get: function () {
        return $http.get('../resources/results.json');
      }
    };
  });
