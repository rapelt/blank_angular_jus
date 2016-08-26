describe('Service results controller', function(){
  beforeEach(module('ossCafeApp'));
  var ablisDataService, scope;

  beforeEach(function(){
    inject(function($rootScope, $controller){
      scope = $rootScope.$new();
      $controller('ResultsController', {$scope: scope});
    });
  });

  it('Should get results', function(){
    scope.$apply();
    expect(scope.serviceGroups).toBe('');
  });
});