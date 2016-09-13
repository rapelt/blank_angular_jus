'use strict';

angular.module('location', ['locationService'])
  .controller('LocationController', function ($scope, $rootScope, $state, brisbane, logan, valley, LocationService) {
    $scope.isGoogleAvaliable = typeof google !== 'undefined';

    if ($scope.isGoogleAvaliable) {
      $scope.polygons = {
        'brisbane': LocationService.getLocationPolygon(brisbane),
        'logan': LocationService.getLocationPolygon(logan),
        'valley': LocationService.getLocationPolygon(valley)
      };
    }

    $scope.showNextPage = function () {
      $state.go('questions');
    };

    $scope.showPreviousPage = function () {
      $state.go('business-activities');
    };
  })
  .directive('locationDirective', function (LocationService, LocationStorage) {
    return {
      restrict: 'E',
      templateUrl: 'features/location/address-selector.html',
      link: function (scope, elem) {
        scope.validRegion = false;

        scope.locationSearch = LocationStorage.getSearchValue();

        if (scope.locationSearch !== '' && scope.locationSearch !== undefined) {
          if (LocationStorage.getValues().length > 0) {
            scope.validRegion = true;
          }
        } else {
          scope.validRegion = false;
        }

        if (scope.isGoogleAvaliable) {
          var autocomplete = LocationService.initAutocomplete(elem);

          autocomplete.addListener('place_changed', function () {
            LocationStorage.clear();
            scope.$apply(function () {
              scope.place = autocomplete.getPlace();
              LocationStorage.setSearchValue(scope.place.formatted_address);
              if (scope.place.geometry === undefined) {
                scope.invalidLocation = true;
                scope.validRegion = false;
                scope.invalidRegion = false;
              } else {
                LocationStorage.setValues(LocationService.getRegions(scope.place.geometry.location, scope.polygons));
                scope.invalidLocation = false;

                if (_.size(LocationStorage.getValues()) > 0) {
                  scope.validRegion = true;
                  scope.invalidRegion = false;
                } else {
                  scope.validRegion = false;
                  scope.invalidRegion = true;
                }
              }
            });
          });
        }
      }
    };
  });
