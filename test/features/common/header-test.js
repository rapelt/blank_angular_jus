describe('Directive: header', function () {
  beforeEach(module('jusCafeApp'));
  var scope, element, elem;

  beforeEach(function () {
    inject(function ($compile, $rootScope, $templateCache) {
      scope = $rootScope.$new();
      $templateCache.put('features/home/home.html', '');
      $templateCache.put('features/common/header.html', '<h1>header</h1>');
      $templateCache.put('features/business-activities/business-activities.html', '');
      element = '<div header></div>';
      elem = $compile(element)(scope);
      scope.$apply();
    });
  });

  it('Should load header view', function () {
    expect(elem.html()).toContain('header');
  });
});
