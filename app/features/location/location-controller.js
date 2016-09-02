'use strict';

angular.module('Location', ['Map', 'FeatureToggle'])
  .controller('LocationController', function () {})
  .directive('locationDirective', function (MapService, FeatureToggleService) {
    return {
      restrict: 'E',
      templateUrl: 'features/location/address-selector.html',
      link: function (scope, elem) {
        var autocomplete = MapService.initAutocomplete(elem.children('#autocomplete')[0]);
        var brisbaneBounds = MapService.getLocationBounds();
        autocomplete.setBounds(brisbaneBounds);
        scope.debugMap = FeatureToggleService.debugMap;

        if (FeatureToggleService.debugMap) {
          MapService.initMap();
          MapService.getLocationPolygon();
        }

        autocomplete.addListener('place_changed', function () {
          scope.$apply(function () {
            scope.place = autocomplete.getPlace();

            if (FeatureToggleService.debugMap) {
              MapService.removeMarker();
              MapService.createMarker(scope.place.geometry.location);
            }
          });
        });
      }
    };
  });
