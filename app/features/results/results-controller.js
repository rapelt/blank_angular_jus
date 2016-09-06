'use strict';

angular.module('Results', ['ServiceFilters', 'data'])
  .controller('ResultsController', function ($scope, DataRepository, ServiceFilters, $rootScope) {
    var servicespromise = DataRepository.getServices();
    servicespromise.then(function (services) {
      services = ServiceFilters.filterByQuestions(services);
      services = ServiceFilters.filterByBusinessActivities(services, $rootScope.businessActivities);

      var servicesArray = Object.keys(services).map(function (key) {
        return services[key];
      });
      var serviceGroups = _.groupBy(servicesArray, 'service_type_id');
      serviceGroups = _.map(serviceGroups, function (serviceGroupArray) {
        var serviceGroup = {};
        var serviceType = serviceGroupArray[0].service_type_id;
        DataRepository.getServiceDetails(serviceType).then(function (serviceDetails) {
          serviceGroup.description = serviceDetails.description;
          serviceGroup.title = serviceDetails.title;
          serviceGroup.id = serviceDetails.id;
        });

        // expanded is used to determine the direction of the arrow -
        // expanding and contracting is done using bootstrap's collapse
        serviceGroup.expanded = false;
        serviceGroup.toggleExpanded = function () {
          serviceGroup.expanded = !serviceGroup.expanded;
        };
        serviceGroup.services = serviceGroupArray;
        return serviceGroup;
      });
      $scope.serviceGroups = serviceGroups;
    });
  });
