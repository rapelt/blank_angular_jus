'use strict';

describe('Service results controller', function () {
  beforeEach(module('jusCafeApp'));
  beforeEach(module('data'));
  var dataRepository, scope, state, deferred, serviceFilters;
  var services = {'02': {
      'id': '02',
      'service_type': 'Code of conduct',
      'business_activities': ['cafe'],
      'location': ['brisbane'],
      'name': 'service name 02',
      'title': 'service name 02',
      'parent_answer_ids': ['1a', '3a', '5a']
  }};

  beforeEach(function () {
    dataRepository = jasmine.createSpyObj('DataRepository', ['getServices']);
    serviceFilters = jasmine.createSpyObj('ServiceFilters', ['filterByQuestions']);
    inject(function ($rootScope, $controller, $q, $templateCache, $state) {
      state = $state;
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/results/_results.html', '');
      $templateCache.put('features/business-types/business-types.html', '');

      deferred = $q.defer();
      dataRepository.getServices.and.returnValue(deferred.promise);
      serviceFilters.filterByQuestions.and.returnValue(services);
      deferred.resolve({});

      $controller('ResultsController', {$scope: scope, DataRepository: dataRepository, ServiceFilters: serviceFilters});
    });
  });

  it('should load results page', function () {
    state.go('results');
    scope.$apply();
    expect(state.current.controller).toBe('ResultsController');
    expect(state.current.url).toBe('/results');
  });

  it('Should get results', function () {
    scope.$apply();
    expect(serviceFilters.filterByQuestions).toHaveBeenCalledWith({});
    expect(scope.serviceGroups[0].description).toBe('Code of conduct');
  });
  it('Should collapse service groups', function () {
    scope.$apply();
    expect(scope.serviceGroups[0].expanded).toBe(false);
    scope.serviceGroups[0].toggleExpanded();
    expect(scope.serviceGroups[0].expanded).toBe(true);
    scope.serviceGroups[0].toggleExpanded();
    expect(scope.serviceGroups[0].expanded).toBe(false);
  });
});
