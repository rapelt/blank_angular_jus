// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
angular.module('Map', [])
 .factory('MapService', function(){
   return {
     geolocate: function(){
       //return users location
       navigator.geolocation.getCurrentPosition(function(position) {
         var geolocation = {
           lat: position.coords.latitude,
           lng: position.coords.longitude
         };
         var circle = new google.maps.Circle({
           center: geolocation,
           radius: position.coords.accuracy
         });
         circle.getBounds();
       });
     },

     getLocationBounds: function(){
       return new google.maps.LatLngBounds({lat: -27.900195, lng: 152.808643},{lat: -27.320875, lng: 153.270568});
     },

     initAutocomplete: function(element){
       return new google.maps.places.Autocomplete(
         element,
         {
           types: ['geocode'],
           componentRestrictions: {country: 'au'}
         }
       );
     }
   }
 });
