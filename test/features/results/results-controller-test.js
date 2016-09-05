'use strict';

describe('Service results controller', function () {
  beforeEach(module('jusCafeApp'));
  beforeEach(module('Results'));
  var resultsService, scope, state, deferred;

  beforeEach(function () {
    resultsService = jasmine.createSpyObj('ResultsService', ['get']);
    inject(function ($rootScope, $controller, $q, $templateCache, $state) {
      state = $state;
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/results/_results.html', '');
      $templateCache.put('features/business-types/business-types.html', '');
      deferred = $q.defer();
      resultsService.get.and.returnValue(deferred.promise);

      $controller('ResultsController', {$scope: scope, ResultsService: resultsService});
    });
  });

  it('should load results page', function () {
    state.go('results');
    scope.$apply();
    expect(state.current.controller).toBe('ResultsController');
    expect(state.current.url).toBe('/results');
  });

  it('Should get results', function () {
    deferred.resolve({ 'data': [{ 'fred': 'nothing' }] });
    scope.$apply();
    expect(scope.serviceGroups[0].fred).toBe('nothing');
  });
  it('Should collapse service groups', function () {
    deferred.resolve({ 'data': [{ 'fred': 'nothing' }] });
    scope.$apply();
    expect(scope.serviceGroups[0].expanded).toBe(false);
    scope.serviceGroups[0].toggleExpanded();
    expect(scope.serviceGroups[0].expanded).toBe(true);
    scope.serviceGroups[0].toggleExpanded();
    expect(scope.serviceGroups[0].expanded).toBe(false);
  });
});
