// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
angular.module('Map', [])
  .factory('MapService', function () {
    var map, marker;
    return {
      initMap: function () {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -27.436394, lng: 153.030275},
          zoom: 9
        });
        map.data.setStyle({
          fillColor: 'red'
        });
      },

      addMarker: function (location) {
        marker = new google.maps.Marker({
          position: location
        });
        marker.setMap(map);
      },

      removeMarker: function (location) {
        if (marker) {
          marker.setMap(null);
        }
      },

      getLocationBounds: function () {
        return new google.maps.LatLngBounds({lat: -27.900195, lng: 152.808643}, {lat: -27.320875, lng: 153.270568});
      },

      getLocationPolygon: function (cb) {
        map.data.loadGeoJson('../resources/brisbane.json', {});
        map.data.loadGeoJson('../resources/logan.json', {});
      },

      isValidLocation: function (locationGeometry) {
        return google.maps.geometry.poly.containsLocation(locationGeometry, this.getLocationPolygon());
      },

      initAutocomplete: function (element) {
        return new google.maps.places.Autocomplete(
          element,
          {
            types: ['geocode'],
            componentRestrictions: {country: 'au'}
          }
        );
      }
    };
  });
