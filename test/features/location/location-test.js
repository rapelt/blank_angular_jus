describe('Location', function () {
  describe('Location: route', function () {
    beforeEach(module('ossCafeApp'))
    var state, scope

    beforeEach(function () {
      inject(function ($state, $rootScope, $templateCache) {
        state = $state
        scope = $rootScope.$new()
        $templateCache.put('features/home/main.html', '')
        $templateCache.put('features/breadcrumbs/breadcrumbs.html', '<h1>Breadcrumbs</h1>')
        $templateCache.put('features/business-types/business-types.html', '')
        $templateCache.put('features/location/location.html', '')
      })
    })
    it('Should navigate to location page', function () {
      state.go('location')
      scope.$apply()
      expect(state.current.url).toBe('/location')
      expect(state.current.controller).toBe('LocationController')
      expect(state.current.templateUrl).toBe('features/location/location.html')
    })
  })

  describe('Location: Directive', function () {
    beforeEach(module('Map'));
    beforeEach(module('Location'));

    var scope;
    beforeEach(function () {
      inject(function ($compile, $rootScope, MapService) {
        scope = $rootScope.$new();
        spyOn(MapService, 'initAutocomplete').and.returnValue({
          setBounds: function(){},
          addListener: function(name, callback){callback()},
          getPlace: function(){return 'Brisbane'}
        });
        spyOn(MapService, 'getLocationBounds').and.returnValue({});
        $compile('<location-directive></location-directive>')(scope)
      })
    })
    it('Should set location on scope', function () {
      expect(scope.place).toBe('Brisbane')
    })
  })
})
