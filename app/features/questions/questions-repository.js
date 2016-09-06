'use strict';

angular.module('data', [])
  .factory('DataRepository', function ($http) {
    return {
      getQuestions: function () {
        return $http.get('../resources/questions.json');
      },

      getAnswers: function () {
        return $http.get('../resources/answers.json');
      },
      getServices: function () {
        return $http.get('../resources/services.json').then(function (response) {
          return response.data;
        });
      },
      getServiceTypes: function () {
        return $http.get('../resources/service_types.json').then(function (response) {
          return response.data;
        });
      },
      getServiceDetails: function (serviceType) {
        return this.getServiceTypes().then(function (serviceTypes) {
          return serviceTypes[serviceType];
        });
      }
    };
  });
