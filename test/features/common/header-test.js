describe('Directive: header', function(){
  beforeEach(module('ossCafeApp'));
  var scope, element, elem;

  beforeEach(function(){
    inject(function($compile, $rootScope, $templateCache){
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/common/header.html', '<h1>header</h1>');
      element = "<div header></div>";
      elem = $compile(element)(scope);
      scope.$apply();
    });
  });

  it('Should load header view', function(){
    expect(elem.html()).toContain('header');
  });
});