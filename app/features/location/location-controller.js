'use strict';

angular.module('Location', [])
  .controller('LocationController', function(){

  })
  .directive('locationDirective', function ($window, MapService ) {
    return {
      restrict: 'E',
      template:'<input class="location-search-input"  id="autocomplete" type="text" placeholder="Your cafe\'s location"/>',
      link: function(scope, elem, attr){
        var autocomplete = new google.maps.places.Autocomplete(
          elem.children('#autocomplete')[0],
          {types: ['geocode']}
        );

        autocomplete.addListener('place_changed', function(){
          var place = autocomplete.getPlace().formatted_address;
        });
      }
    };
  });
