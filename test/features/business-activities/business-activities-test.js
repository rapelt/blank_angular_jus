'use strict';

describe('Business activities controller', function () {
  beforeEach(module('jusCafeApp'));
  var scope, state, businessActivities;

  beforeEach(module('businessActivities'));
  beforeEach(function () {
    inject(function ($controller, $rootScope, $q, $templateCache, $state, BusinessActivities, $location) {
      state = $state;
      businessActivities = BusinessActivities;
      scope = $rootScope.$new();
      $templateCache.put('features/home/home.html', '');
      $templateCache.put('features/results/_results.html', '');
      $templateCache.put('features/questions/questions.html', '');
      $templateCache.put('features/business-activities/business-activities.html', '');

      $controller('BusinessActivitiesController', {$scope: scope, $state: state});
      scope.$apply();
    });
  });

  it('should load business types page', function () {
    state.go('business-activities');
    scope.$apply();
    expect(state.current.controller).toBe('BusinessActivitiesController');
    expect(state.current.url).toBe('/business-activities');
  });

  it('Should restrict access to the next button ', function () {
    scope.isNextButtonEnabled();
    scope.$apply();
    expect(scope.isNextButtonEnabled()).toBeFalsy();
  });

  it('Should enable access to the next button ', function () {
    businessActivities.setValue({id: 'cafe', value: true});

    scope.isNextButtonEnabled();
    scope.$apply();
    expect(scope.isNextButtonEnabled()).toBeTruthy();
  });

  it('Should clear values', function () {
    businessActivities.setValue({id: 'cafe', value: true});
    expect(businessActivities.getValues()).toEqual({ cafe: true, mobile: false, takeaway: false });
    businessActivities.clear();
    expect(businessActivities.getValues()).toEqual({});
  });
});
