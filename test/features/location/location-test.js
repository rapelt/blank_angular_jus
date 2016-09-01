describe('Location', function(){
  describe('Location: route', function(){
    beforeEach(module('ossCafeApp'));
    var state, scope;

    beforeEach(function(){
      inject(function($state, $rootScope, $templateCache){
        state = $state;
        scope = $rootScope.$new();
        $templateCache.put('features/home/main.html', '');
        $templateCache.put('features/breadcrumbs/breadcrumbs.html', '<h1>Breadcrumbs</h1>');
        $templateCache.put('features/business-types/business-types.html', '');
        $templateCache.put('features/location/location.html', '');
      });
    });

    it('Should navigate to location page', function(){
      state.go('location');
      scope.$apply();
      expect(state.current.url).toBe('/location');
      expect(state.current.controller).toBe('LocationController');
      expect(state.current.templateUrl).toBe('features/location/location.html');
    });
  });

  describe('Location: Controller', function(){
    beforeEach(module('Location'));
    var scope;
    beforeEach(function(){
      inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        $controller('LocationController',{$scope: scope});
      })
    })
    it('Should set location on scope', function(){
      expect(scope.location).toBe('Brisbane');
    })
  });

});
