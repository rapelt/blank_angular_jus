'use strict';

angular.module('Location', ['Map', 'FeatureToggle'])
  .controller('LocationController', function ($scope, brisbane, logan) {
    $scope.brisbane = brisbane;
    $scope.logan = logan;
  })
  .directive('locationDirective', function (MapService, FeatureToggleService) {
    return {
      restrict: 'E',
      templateUrl: 'features/location/address-selector.html',
      link: function (scope, elem) {
        var autocomplete = MapService.initAutocomplete(elem.children('#autocomplete')[0]);
        var brisbaneBounds = MapService.getLocationBounds();
        autocomplete.setBounds(brisbaneBounds);
        scope.debugMap = FeatureToggleService.debugMap;
        scope.isInRegion = true;

        if (FeatureToggleService.debugMap) {
          MapService.initMap();
        }

        autocomplete.addListener('place_changed', function () {
          scope.$apply(function () {
            scope.place = autocomplete.getPlace();

            if (FeatureToggleService.debugMap) {
              MapService.removeMarker();
              MapService.addMarker(scope.place.geometry.location);
            }

            var brisbanePoly = MapService.getLocationPolygon(scope.brisbane);

            var isValidLocation = MapService.isValidLocation(scope.place.geometry.location, brisbanePoly, scope.logan);
            console.log(isValidLocation);
          });
        });
      }
    };
  });
