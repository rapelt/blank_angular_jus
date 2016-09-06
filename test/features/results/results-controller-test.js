'use strict';

describe('Service results controller', function () {
  beforeEach(module('jusCafeApp'));
  beforeEach(module('data'));
  var dataRepository, scope, state, deferredServices, deferredServiceDetails,serviceFilters;
  var services = {'02': {
      'id': '02',
      'service_type': 'Codeofconduct',
      'business_activities': ['cafe'],
      'location': ['brisbane'],
      'name': 'service name 02',
      'title': 'service name 02',
      'parent_answer_ids': ['1a', '3a', '5a']
  }};

  var serviceDetails = {
    'id': 'CodeofPractice',
    'title': 'Code of Practice',
    'description': 'A code of practice can be either a legal requirement or non-legal requirement. Legal codes of practice are defined as a result of legislation. Non-legal codes of practice are defined by industry regulators and bodies.'
  };

  beforeEach(function () {
    dataRepository = jasmine.createSpyObj('DataRepository', ['getServices', 'getServiceDetails']);
    serviceFilters = jasmine.createSpyObj('ServiceFilters', ['filterByQuestions', 'filterByBusinessActivities']);
    inject(function ($rootScope, $controller, $q, $templateCache, $state) {
      state = $state;
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/results/_results.html', '');
      $templateCache.put('features/business-types/business-types.html', '');

      deferredServices = $q.defer();
      deferredServiceDetails = $q.defer();
      dataRepository.getServices.and.returnValue(deferredServices.promise);
      dataRepository.getServiceDetails.and.returnValue(deferredServiceDetails.promise);

      serviceFilters.filterByQuestions.and.returnValue(services);
      serviceFilters.filterByBusinessActivities.and.returnValue(services);
      deferredServices.resolve({});
      deferredServiceDetails.resolve(serviceDetails);

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
    expect(scope.serviceGroups[0].title).toBe('Code of Practice');
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
