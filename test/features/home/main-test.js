'use strict';

describe('Controller: MainController', function () {
  beforeEach(module('ossCafeApp'));
  var scope, state;

  beforeEach(inject(function ($templateCache, $rootScope, $state) {
    scope = $rootScope.$new();
    state = $state;
    $templateCache.put('features/home/main.html', '');
  }));

  it('should load home page', function () {
    state.go('main');
    scope.$apply();
    expect(state.current.controller).toBe('MainController');
    expect(state.current.url).toBe('/');
  });
});
