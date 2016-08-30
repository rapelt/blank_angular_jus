'use strict';

describe('Service results controller', function(){
  beforeEach(module('ossCafeApp'));
  var ablisDataService, scope, state, deferred;

  beforeEach(function(){
    ablisDataService = jasmine.createSpyObj('ablisDataService', ['getResults']);
    inject(function($rootScope, $controller, $q, $templateCache, $state){
      state = $state;
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/results/_results.html', '');

      deferred = $q.defer();
      ablisDataService.getResults.and.returnValue(deferred.promise);

      $controller('ResultsController', {$scope: scope, AblisDataService: ablisDataService});
    });
  });

  it('should load results page', function () {
      state.go('results');
      scope.$apply();
      expect(state.current.controller).toBe('ResultsController');
      expect(state.current.url).toBe('/results');
  });

  it('Should get results', function(){
    deferred.resolve({ "data": [{ "fred" : "nothing" }] });
    scope.$apply();
    expect(scope.serviceGroups[0].fred).toBe('nothing');
  });
});
