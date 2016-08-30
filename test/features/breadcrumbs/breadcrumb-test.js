describe('Directive: breadcrumbs', function(){
  beforeEach(module('ossCafeApp'));
  var scope, element, elem;

  beforeEach(function(){
    inject(function($compile, $rootScope, $templateCache){
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/breadcrumbs/breadcrumbs.html', '<h1>Breadcrumbs</h1>');
      $templateCache.put('features/business-types/business-types.html', '');
      element = "<div breadcrumbs></div>"
      elem = $compile(element)(scope);
      scope.$apply();
    });
  });

  it('Should load breadcrumbs view', function(){
      expect(elem.html()).toContain('Breadcrumbs');
  });
});
