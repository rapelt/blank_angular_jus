'use strict';

describe('Service results controller no filters', function () {
  beforeEach(module('businessActivities'));
  beforeEach(module('data'));
  beforeEach(module('jusCafeApp'));

  var dataRepository, scope;
  beforeEach(function () {
    dataRepository = jasmine.createSpyObj('DataRepository', ['getServices', 'getServiceDetails']);
    inject(function ($rootScope, $controller, $q, $templateCache, BusinessActivities) {
      scope = $rootScope.$new();
      $templateCache.put('features/home/home.html', '');
      $templateCache.put('features/results/_results.html', '');
      $templateCache.put('features/business-activities/business-activities.html', '');

      spyOn(BusinessActivities, 'getTrueValueKeys').and.returnValue([]);

      $controller('ResultsController', {$scope: scope, DataRepository: dataRepository});
    });
  });
  it('Should get results with threadless services', function () {
    scope.$apply();
    expect(scope.isFiltered).toBe(false);
  });
});
