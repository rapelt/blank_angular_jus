'use strict';

describe('Business types controller', function () {
  beforeEach(module('ossCafeApp'));
  beforeEach(module('Business-types'));
  var scope, state, rootScope;

  beforeEach(function () {
    inject(function ($rootScope, $controller, $q, $templateCache, $state) {
      state = $state;
      scope = $rootScope.$new();
      rootScope = $rootScope;
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/results/_results.html', '');
      $templateCache.put('features/questions/questions.html', '');
      $templateCache.put('features/business-types/business-types.html', '');

      $controller('BusinessTypesController', {$scope: scope, $state: state});
    });
  });

  it('Should increase page number when next button is called', function () {
    state.go('business-types');
    scope.showNextPage();
    scope.$apply();
    expect(state.current.controller).toBe('QuestionsController');
    expect(state.current.url).toBe('/questions');
  });

  it('should load business types page', function () {
    state.go('business-types');
    scope.$apply();
    expect(state.current.controller).toBe('BusinessTypesController');
    expect(state.current.url).toBe('/');
  });

  it('Should increase page number when next button is called', function () {
    state.go('business-types');
    scope.showNextPage();
    scope.$apply();
    expect(state.current.controller).toBe('QuestionsController');
    expect(state.current.url).toBe('/questions');
  });

  it('Should restrict access to the next button ', function () {
    scope.isNextButtonEnabled();
    scope.$apply();
    expect(scope.isNextButtonEnabled()).toBeFalsy();
  });

  it('Should enable access to the next button ', function () {
    rootScope.businessActivities.cafe = true;
    scope.isNextButtonEnabled();
    scope.$apply();
    expect(scope.isNextButtonEnabled()).toBeTruthy();
  });
});
