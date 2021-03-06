describe('Directive: breadcrumbs', function () {
  beforeEach(module('jusCafeApp'));
  var scope, element, elem;

  beforeEach(function () {
    inject(function ($compile, $rootScope, $templateCache) {
      scope = $rootScope.$new();
      $templateCache.put('features/home/home.html', '');
      $templateCache.put('features/breadcrumbs/breadcrumbs.html', '<h1>Breadcrumbs</h1>');
      element = '<div breadcrumbs></div>';
      elem = $compile(element)(scope);
      scope.$apply();
    });
  });

  it('Should load breadcrumbs view', function () {
    expect(elem.html()).toContain('Breadcrumbs');
  });
});
