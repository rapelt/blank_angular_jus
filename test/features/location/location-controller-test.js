'use strict';

describe('Locations controller', function () {
  beforeEach(module('location'));
  beforeEach(module('jusCafeApp'));
  var deferredLocationLogan, deferredLocationBrisbane, deferredLocationValley, scope, state;

  var brisbanePoly = {
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

  var valleyPoly = {
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

  var loganPoly = {
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
    inject(function ($rootScope, $controller, $q, $templateCache, $state, LocationRepository) {
      state = $state;
      scope = $rootScope.$new();

      $templateCache.put('features/business-activities/business-activities.html', '');
      $templateCache.put('features/location/location.html', '');
      $templateCache.put('features/questions/questions.html', '');

      deferredLocationBrisbane = $q.defer();
      deferredLocationLogan = $q.defer();
      deferredLocationValley = $q.defer();

      deferredLocationValley.resolve(valleyPoly);
      deferredLocationLogan.resolve(loganPoly);
      deferredLocationBrisbane.resolve(brisbanePoly);

      spyOn(LocationRepository, 'getBrisbaneLocation').and.returnValue(deferredLocationBrisbane.promise);
      spyOn(LocationRepository, 'getLoganLocation').and.returnValue(deferredLocationLogan.promise);
      spyOn(LocationRepository, 'getValleyLocation').and.returnValue(deferredLocationValley.promise);

      $controller('LocationController', { $scope: scope, $state: state, brisbane: { 'data': brisbanePoly }, logan: { 'data': loganPoly }, valley: {'data': valleyPoly} });
    });
  });

  it('should load location page', function () {
    state.go('location');
    scope.$apply();
    expect(state.current.controller).toBe('LocationController');
    expect(state.current.url).toBe('/location');
  });

  it('Should go to questions when next is clicked', function () {
    state.go('location');
    scope.$apply();
    scope.showNextPage();
    scope.$apply();
    expect(state.current.url).toBe('/questions');
  });

  it('Should go to business-activities when previous is clicked', function () {
    state.go('location');
    scope.$apply();
    scope.showPreviousPage();
    scope.$apply();
    expect(state.current.url).toBe('/business-activities');
  });

  it('Should disable next button when location is invalid', function () {
    state.go('location');
    scope.$apply();
    scope.isGoogleAvaliable = true;
    scope.validRegion = false;
    expect(scope.validRegion).toBe(false);
  });
});
