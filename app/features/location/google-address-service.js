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

      getLocationPolygon: function (locationGeoJSON) {
        var path = _.map(locationGeoJSON.data.geometry.coordinates, function (entry) {
          return _.reduce(entry, function (list, polygon) {
            _.each(_.map(polygon, function (point) {
              return new google.maps.LatLng(point[ 1 ], point[ 0 ]);
            }), function (point) {
              list.push(point);
            });

            return list;
          }, []);
        });

        return new google.maps.Polygon({paths: path});
      },

      isValidLocation: function (location, brisbane, logan) {
        if(google.maps.geometry.poly.containsLocation(location, brisbane)){
          return 'Brisbane';
        }
        return 'none';
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
