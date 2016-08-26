'use strict';

describe('Service results controller', function(){
  beforeEach(module('ossCafeApp'));
  var ablisDataService, scope, deferred;

  beforeEach(function(){
    ablisDataService = jasmine.createSpyObj('ablisDataService', ['getQuestions']);
    inject(function($rootScope, $controller, $q, $templateCache){
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');

      deferred = $q.defer();
      ablisDataService.getQuestions.and.returnValue(deferred.promise);

      $controller('QuestionsController', {$scope: scope, AblisDataService: ablisDataService});
    });
  });

  it('Should get results', function(){
    deferred.resolve({"data": "fred"});
    scope.$apply();
    expect(scope.ablisQuestions).toBe('fred');
  });
});
