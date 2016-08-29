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
	  scope.serviceGroups = [{
			"title": "Group 1",
			"id": "sg1",
			"description": "Group 1 desc",
			"services": [
				{
					"service_id": "ffff-0001",
					"summary": "service 1",
					"title": "service 1 title",
				}
			],
		}];
		scope.$apply();
  	//expect(element.html()).toBe('');
		//var g1ele = element.find('#heading-ffff-0001');
		var g1ele = element.find('div');
		console.log('hello');
		console.log(g1ele);
		expect(g1ele).toBeDefined();
		expect(g1ele.text()).toBe('x');
 });
});
