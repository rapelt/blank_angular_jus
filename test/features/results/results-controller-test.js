'use strict';

describe('Service results controller', function(){
  beforeEach(module('ossCafeApp'));
  var ablisDataService, scope, deferred;

  beforeEach(function(){
    ablisDataService = jasmine.createSpyObj('ablisDataService', ['getResults']);
    inject(function($rootScope, $controller, $q, $templateCache){
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');

      deferred = $q.defer();
      ablisDataService.getResults.and.returnValue(deferred.promise);

      $controller('ResultsController', {$scope: scope, AblisDataService: ablisDataService});
    });
  });

  it('Should get results', function(){
    deferred.resolve({"data": "fred"});
    scope.$apply();
    expect(scope.serviceGroups).toBe('fred');
  });
});
