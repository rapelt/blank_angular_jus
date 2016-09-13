'use strict';

angular.module('serviceDetails', ['serviceFilters', 'data', 'ngSanitize'])
  .controller('ServiceDetailsController', function ($scope, ServiceDetailsStorage) {
    $scope.data = ServiceDetailsStorage.getValues().description;
  });
