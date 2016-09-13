'use strict';

describe('Service results controller', function () {
  beforeEach(module('businessActivities'));
  beforeEach(module('data'));
  beforeEach(module('jusCafeApp'));

  var dataRepository, scope, state, deferredServices, deferredServiceDetails, serviceFilters;
  var services = {
    '02': {
      'id': '02',
      'service_type': 'Codeofconduct',
      'business_activities': ['cafe'],
      'location': ['brisbane'],
      'name': 'service name 02',
      'title': 'service name 02',
      'parent_answer_ids': ['1a', '3a', '5a']
    },
    '04': {
      'id': '04',
      'service_type': 'Codeofconduct',
      'business_activities': ['cafe'],
      'location': ['brisbane'],
      'name': 'service name 04',
      'title': 'service name 04',
      'parent_answer_ids': ['1a', '3a', '5a']
    }
  };
  var threadLessServices = {
    '03': {
      'id': '03',
      'service_type': 'Codeofconduct',
      'business_activities': ['cafe'],
      'location': ['brisbane'],
      'name': 'service name 03',
      'title': 'service name 03',
      'parent_answer_ids': []
    }
  };
  var serviceDetails = {
    'id': 'CodeofPractice',
    'title': 'Code of Practice',
    'description': 'A code of practice can be either a legal requirement or non-legal requirement. Legal codes of practice are defined as a result of legislation. Non-legal codes of practice are defined by industry regulators and bodies.'
  };

  beforeEach(function () {
    dataRepository = jasmine.createSpyObj('DataRepository', ['getServices', 'getServiceDetails']);
    inject(function ($rootScope, $controller, $q, $templateCache, $state, BusinessActivities, ServiceFilters) {
      state = $state;
      scope = $rootScope.$new();
      serviceFilters = ServiceFilters;
      $templateCache.put('features/home/home.html', '');
      $templateCache.put('features/results/_results.html', '');
      $templateCache.put('features/business-activities/business-activities.html', '');

      spyOn(BusinessActivities, 'getTrueValueKeys').and.returnValue(['mobile', 'cafe']);

      deferredServices = $q.defer();
      deferredServiceDetails = $q.defer();
      dataRepository.getServices.and.returnValue(deferredServices.promise);
      dataRepository.getServiceDetails.and.returnValue(deferredServiceDetails.promise);

      spyOn(serviceFilters, 'filterByQuestions').and.callThrough();
      spyOn(serviceFilters, 'getThreadlessServices').and.returnValue(threadLessServices);
      spyOn(serviceFilters, 'filterByBusinessActivities').and.callThrough();
      spyOn(serviceFilters, 'filterByLocations').and.returnValue(threadLessServices);

      deferredServices.resolve(services);
      deferredServiceDetails.resolve(serviceDetails);

      $controller('ResultsController', {$scope: scope, DataRepository: dataRepository});
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
    expect(serviceFilters.filterByQuestions.calls.allArgs()[0][0]['02'].service_type).toBe('Codeofconduct');
    expect(scope.serviceGroups[0].title).toBe('Code of Practice');
  });

  it('Should get results with threadless services', function () {
    scope.$apply();
    expect(serviceFilters.filterByQuestions.calls.allArgs()[0][0]['02'].service_type).toBe('Codeofconduct');
    expect(scope.serviceGroups[0].title).toBe('Code of Practice');
    expect(scope.serviceGroups[0].services[0].name).toBe('service name 03');
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
