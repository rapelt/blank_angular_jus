'use strict';

angular.module('Results', ['ServiceFilters', 'data'])
  .controller('ResultsController', function ($scope, DataRepository, ServiceFilters) {
    var servicespromise = DataRepository.getServices();
    servicespromise.then(function (services) {
      services = ServiceFilters.filterByQuestions(services);
      var servicesArray = Object.keys(services).map(function (key) {
        return services[key];
      });
      var serviceGroups = _.groupBy(servicesArray, 'service_type');
      $scope.serviceGroups = _.map(serviceGroups, function (serviceGroupArray) {
        var serviceGroup = [];
        var serviceType = serviceGroupArray[0].service_type;
        serviceGroup.description = serviceType;
        serviceGroup.title = serviceType;
        serviceGroup.expanded = false;
        serviceGroup.toggleExpanded = function () {
          serviceGroup.expanded = !serviceGroup.expanded;
        };
        serviceGroup.services = serviceGroupArray;
        return serviceGroup;
      });
    });
  });
