'use strict';

angular.module('Location', ['Map'])
  .controller('LocationController', function(){

  })
  .directive('locationDirective', function (MapService ) {
    return {
      restrict: 'E',
      template: '<input class="location-search-input" id="autocomplete" type="text" placeholder="Your cafe\'s location"/>',
      link: function(scope, elem, attr){
        var autocomplete = MapService.initAutocomplete(elem.children('#autocomplete')[0]);
        var brisbaneBounds = MapService.getLocationBounds();
        autocomplete.setBounds(brisbaneBounds);

        autocomplete.addListener('place_changed', function(){
          scope.$apply(function(){
            scope.place = autocomplete.getPlace();
          })
        });
      }
    };
  });
