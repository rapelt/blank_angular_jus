'use strict';

describe('Location services', function () {
  beforeEach(module('locationStorage'));
  beforeEach(module('locationService'));
  beforeEach(module('jusCafeApp'));

  var scope, state, locationService;

  var brisbanePolygonGeojson = {
    'type': 'Feature',
    'geometry': {
      'type': 'MultiPolygon',
      'coordinates': [
        [
          [
            [152, -27], [152, -26], [153, -26], [153, -27], [152, -27]
          ]
        ]
      ]
    },
    'properties': {
      'ADMINTYPEN': 'LOCAL GOVERNMENT',
      'ADMINAREAN': 'DODGE CITY',
      'LGA_CODE': '1000',
      'ABBREV_NAM': 'DODGE',
      'SHAPE_Leng': 3.75410610846,
      'SHAPE_Area': 0.126017260409
    }
  };

  var valleyPolygonGeojson = {
    'type': 'Feature',
    'geometry': {
      'type': 'MultiPolygon',
      'coordinates': [
        [[[ 152.555, -26.555 ], [ 152.777, -26.222 ], [ 152.8, -26.35 ], [ 152.7, -26.52 ], [ 152.555, -26.555 ]]]
      ]
    },
    'properties': {
      'ADMINTYPEN': 'LOCAL GOVERNMENT',
      'ADMINAREAN': 'Valley',
      'LGA_CODE': '1000',
      'ABBREV_NAM': 'BRISBANE',
      'SHAPE_Leng': 3.75410610846,
      'SHAPE_Area': 0.126017260409
    }
  };

  var loganPolygonGeojson = {
    'type': 'Feature',
    'geometry': {
      'type': 'MultiPolygon',
      'coordinates': [
        [
          [
            [142, -27], [142, -26], [143, -26], [143, -27], [142, -27]
          ]
        ]
      ]
    },
    'properties': {
      'ADMINTYPEN': 'LOCAL GOVERNMENT',
      'ADMINAREAN': 'LOGAN CITY',
      'LGA_CODE': '1000',
      'ABBREV_NAM': 'DODGE',
      'SHAPE_Leng': 3.75410610846,
      'SHAPE_Area': 0.126017260409
    }
  };

  beforeEach(function () {
    inject(function ($controller, $rootScope, $templateCache, $state, LocationService) {
      scope = $rootScope.$new();
      state = $state;
      locationService = LocationService;

      $templateCache.put('features/location/location.html', '');
      $controller('LocationController', { $scope: scope, $state: state, brisbane: { 'data': brisbanePolygonGeojson }, logan: { 'data': loganPolygonGeojson }, valley: { 'data': valleyPolygonGeojson } });
    });
  });

  it('Should get regions when point is inside', function () {
    var pointInsideBrisbane = new google.maps.LatLng(-26.5, 152.5);
    var pointInsideLogan = new google.maps.LatLng(-26.5, 142.5);
    var pointInsideValley = new google.maps.LatLng(-26.457399, 152.687523);

    expect(locationService.getRegions(pointInsideBrisbane, scope.polygons)).toEqual(['brisbane']);
    expect(locationService.getRegions(pointInsideLogan, scope.polygons)).toEqual(['logan']);
    expect(locationService.getRegions(pointInsideValley, scope.polygons)).toEqual(['brisbane', 'valley']);
  });

  it('Should get no regions when point is outside', function () {
    var pointOutside = new google.maps.LatLng(0, 0);
    expect(locationService.getRegions(pointOutside, scope.polygons)).toEqual([]);
  });
});
