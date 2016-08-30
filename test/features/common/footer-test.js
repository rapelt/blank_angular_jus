describe('Directive: footer', function(){
  beforeEach(module('ossCafeApp'));
  var scope, element, elem;

  beforeEach(function(){
    inject(function($compile, $rootScope, $templateCache){
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/common/footer.html', '<h1>footer</h1>');
      $templateCache.put('features/business-types/business-types.html', '');
      element = "<div footer></div>";
      elem = $compile(element)(scope);
      scope.$apply();
    });
  });

  it('Should load footer view', function(){
    expect(elem.html()).toContain('footer');
  });
});
