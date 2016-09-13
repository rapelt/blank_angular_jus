'use strict';

describe('Business activities state controller', function () {
  beforeEach(module('businessActivities'));
  beforeEach(module('jusCafeApp'));
  var scope, state;
  beforeEach(function () {
    inject(function ($controller, $rootScope, $q, $templateCache, $state, BusinessActivities, $location) {
      scope = $rootScope.$new();
      state = $state;
      $templateCache.put('features/home/home.html', '');
      $templateCache.put('features/results/_results.html', '');
      $templateCache.put('features/questions/questions.html', '');
      $templateCache.put('features/business-activities/business-activities.html', '');

      state = {
        go: function () {
          return $location.path('/business-activities');
        },
        current: {
          controller: 'LocationController',
          url: '/location'
        },
        resolve: {
          brisbane: function () { return; }
        }
      };
      $controller('BusinessActivitiesController', {$scope: scope, $state: state});
      scope.$apply();
    });
  });

  it('Should increase page number when next button is called', function () {
    state.go('business-activities');
    scope.showNextPage();
    scope.$apply();
    expect(state.current.controller).toBe('LocationController');
    expect(state.current.url).toBe('/location');
  });
});
