// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
angular.module('locationService', [])
  .factory('LocationService', function () {
    function initAutocomplete (element) {
      return new google.maps.places.Autocomplete(
        element,
        {
          types: ['geocode'],
          componentRestrictions: {country: 'au'}
        }
      );
    }

    return {
      initAutocomplete: function (elem) {
        var autocomplete = initAutocomplete(elem.children('#autocomplete')[0]);
        autocomplete.setBounds(new google.maps.LatLngBounds({lat: -27.900195, lng: 152.808643}, {lat: -27.320875, lng: 153.270568}));

        return autocomplete;
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

      getRegions: function (location, polygons) {
        var regions = [];

        _.each(polygons, function (polygon, region) {
          if (google.maps.geometry.poly.containsLocation(location, polygon)) {
            regions.push(region);
          }
        });

        return regions;
      }
    };
  });
