'use strict';

describe('Service questions controller', function(){
  beforeEach(module('ossCafeApp'));
  var ablisDataService, scope, state, deferred;

  beforeEach(function(){
    ablisDataService = jasmine.createSpyObj('ablisDataService', ['getQuestions']);
    inject(function($rootScope, $controller, $q, $templateCache, $state){
      state = $state;
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/questions/questions.html', '');

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
    expect(scope.ablisQuestions).toBe('fred');
  });
});
