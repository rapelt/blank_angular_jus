'use strict';

angular.module('results', ['serviceFilters', 'data', 'serviceDetails'])
  .controller('ResultsController', function ($scope, $state, DataRepository, ServiceFilters, ServiceDetailsStorage) {
    var serviceGroups = [];
    var serviceDictionary;
    var servicespromise = DataRepository.getServices();
    $scope.isFiltered = true;
    if (ServiceFilters.numberOfFilters() === 0) {
      $scope.isFiltered = false;
    } else {
      $scope.isFiltered = true;
      servicespromise.then(function (services) {
        serviceDictionary = JSON.parse(JSON.stringify(services));
        var threadLessServices = ServiceFilters.getThreadlessServices(services);
        services = ServiceFilters.filterByBusinessActivities(services);
        services = ServiceFilters.filterByQuestions(services);

        services = angular.extend({}, services, threadLessServices);
        services = ServiceFilters.filterByLocations(services);

        var servicesArray = Object.keys(services).map(function (key) {
          return services[ key ];
        });

        servicesArray = _.uniq(servicesArray);
        serviceGroups = _.groupBy(servicesArray, 'service_type_id');
        serviceGroups = _.map(serviceGroups, function (serviceGroupArray) {
          var serviceGroup = {};
          var serviceType = serviceGroupArray[ 0 ].service_type_id;
          DataRepository.getServiceDetails(serviceType).then(function (serviceDetails) {
            serviceGroup.weight = serviceDetails.weight;
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
        $scope.$evalAsync();
      });
    }
    $scope.displayDetails = function (serviceId) {
      ServiceDetailsStorage.setValues(serviceDictionary[serviceId]);
      $state.go('service-details');
    };
  });
