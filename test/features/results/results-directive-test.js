describe('Directive: results', function(){
	var html 
  var scope, element;
	beforeEach(function(){
		module("templates");
		module('ossCafeApp');
		inject(function($compile, $rootScope, $templateCache){
		 scope = $rootScope.$new();
		 $templateCache.put('features/home/main.html', '');
		 element = $compile('<div results></div>')(scope);
		});
	});
  
 it('Should show results', function(){
	  scope.serviceGroups = [{},{}];
		scope.$apply();
  	expect(element.html()).toBe('');
 });
});
