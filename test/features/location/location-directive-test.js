describe('Location: Directive', function () {
  beforeEach(module('templates'));
  beforeEach(module('Map'));
  beforeEach(module('Location'));

  var scope;
  var listeners = [];

  function addSpyListener (name, callback) {
    listeners.push(callback);
  }

  beforeEach(function () {
    inject(function ($compile, $rootScope, MapService, $templateCache) {
      $templateCache.put('features/location/location.html', '<location-directive></location-directive>');
      $templateCache.put('features/location/address-selector.html', '<div>Hi</div>');
      scope = $rootScope.$new();

      spyOn(MapService, 'initAutocomplete').and.returnValue({
        setBounds: function () {},
        addListener: addSpyListener,
        getPlace: function () {
          return 'Brisbane';
        }
      });
      spyOn(MapService, 'getLocationBounds').and.returnValue({});
      $compile('<location-directive></location-directive>')(scope);
      scope.$apply();
    });
  });

  it('Should set location on scope', function () {
    listeners[0]();
    scope.$apply();
    expect(scope.place).toBe('Brisbane');
  });
});
