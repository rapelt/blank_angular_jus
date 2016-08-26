describe('Ablis data services', function(){
  beforeEach(module('AblisData'));
  var ablisDataService, scope;

  beforeEach(function(){
    inject(function(AblisDataService, $rootScope){
      scope = $rootScope.$new();
      ablisDataService = AblisDataService;
    });

  });

  xit('Should return results', function(){
    ablisDataService.getResults().then(function(response){
      expect(response.data[0].title).toBe('Industry Specific Licenses');
    });
    scope.$apply();
  });
});