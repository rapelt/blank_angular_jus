'use strict';

describe('Service questions controller', function(){
  beforeEach(module('ossCafeApp'));
  var questionsService, scope, state, deferred;

  beforeEach(function(){
    questionsService = jasmine.createSpyObj('questionService', ['get']);
    inject(function($rootScope, $controller, $q, $templateCache, $state){
      state = $state;
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/business-types/business-types.html', '');
      $templateCache.put('features/questions/questions.html', '');


      deferred = $q.defer();
      questionsService.get.and.returnValue(deferred.promise);

      $controller('QuestionsController', {$scope: scope, $state:state, QuestionsService: questionsService});
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

  it('Should increase page number when next button is called', function(){
    deferred.resolve({"data": "fred"});
    scope.$apply();
    scope.showNextPage();
    expect(scope.page).toBe(1);
  });

  it('Should decrease page number when previous button is called', function(){
    deferred.resolve({"data": "fred"});
    scope.page = 1;
    scope.$apply();
    scope.showPreviousPage();
    expect(scope.page).toBe(0);
  });

  it('Should return to home when previous button is called', function(){
    state.go('questions');
    scope.page = 0;
    scope.$apply();
    expect(state.current.url).toBe('/questions');
    scope.showPreviousPage();
    scope.$apply();
    expect(state.current.url).toBe('/');
  });
});
