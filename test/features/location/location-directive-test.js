describe('Location: Directive', function () {
  beforeEach(module('templates'));
  beforeEach(module('locationStorage'));
  beforeEach(module('location'));

  var scope, locationStorage;
  var address = '';

  beforeEach(inject(function ($rootScope, $q, $compile, LocationStorage, $templateCache) {
    locationStorage = LocationStorage;

    spyOn(LocationStorage, 'getValues').and.returnValue(['brisbane']);

    $templateCache.put('features/location/address-selector.html', '<div>Hi</div>');

    scope = $rootScope.$new();

    $compile('<location-directive></location-directive>')(scope);
  }));

  it('Should return true if location search is defined and at least one region is avaliable', function () {
    address = '4 Suncroft St, Brisbane';
    spyOn(locationStorage, 'getSearchValue').and.returnValue(address);
    scope.isGoogleAvaliable = false;
    scope.$apply();
    expect(scope.locationSearch).toBe(address);
    expect(scope.validRegion).toBe(true);
  });

  it('Should return false if location search is undefined', function () {
    address = '';
    spyOn(locationStorage, 'getSearchValue').and.returnValue(address);
    scope.isGoogleAvaliable = false;
    scope.$apply();
    expect(scope.locationSearch).toBe(address);
    expect(scope.validRegion).toBe(false);
  });

  it('Should return false if location search is undefined', function () {
    address = '';
    spyOn(locationStorage, 'getSearchValue').and.returnValue(address);
    scope.isGoogleAvaliable = false;
    scope.$apply();
    expect(scope.locationSearch).toBe(address);
    expect(scope.validRegion).toBe(false);
  });
});
