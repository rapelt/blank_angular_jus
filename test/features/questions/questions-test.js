'use strict';

describe('Service questions controller', function(){
  beforeEach(module('ossCafeApp'));
  var ablisDataService, scope, state, deferred, location;

  beforeEach(function(){
    ablisDataService = jasmine.createSpyObj('ablisDataService', ['getQuestions']);
    inject(function($rootScope, $controller, $q, $templateCache, $state, $location){
      state = $state;
      location = $location
      scope = $rootScope.$new();
      $templateCache.put('features/questions/questions.html', '');
      $templateCache.put('features/home/main.html', '');

      deferred = $q.defer();
      ablisDataService.getQuestions.and.returnValue(deferred.promise);

      $controller('QuestionsController', {$scope: scope, AblisDataService: ablisDataService});
    });
  });

  it('should load questions page', function () {
      state.go('questions');
      scope.$apply();
      expect(state.current.controller).toBe('QuestionsController');
      expect(state.current.url).toBe('/questions');
  });

  it('Should get questions', function(){
    deferred.resolve({"data": "fred"});
    scope.$apply();
    expect(scope.ablisData).toBe('fred');
  });

  xit('Should increase page number when next button is called', function(){
    deferred.resolve({"data": "fred"});
    scope.$apply();
    scope.showNextPage();
    expect(scope.page).toBe(1);
  });

  xit('Should decrease page number when previous button is called', function(){
    deferred.resolve({"data": "fred"});
    scope.page = 1;
    scope.$apply();
    scope.showPreviousPage();
    expect(scope.page).toBe(0);
  });
});
