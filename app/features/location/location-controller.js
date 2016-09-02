'use strict'

angular.module('Location', ['Map'])
  .controller('LocationController', function () {})
  .directive('locationDirective', function (MapService) {
    return {
      restrict: 'E',
      templateUrl: 'features/location/address-selector.html',
      link: function (scope, elem) {
        var autocomplete = MapService.initAutocomplete(elem.children('#autocomplete')[0])
        var brisbaneBounds = MapService.getLocationBounds()
        autocomplete.setBounds(brisbaneBounds)

        autocomplete.addListener('place_changed', function () {
          scope.$apply(function () {
            scope.place = autocomplete.getPlace()
          })
        })
      }
    }
  })
