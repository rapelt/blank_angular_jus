describe('Directive: results', function () {
  var scope, element;
  beforeEach(function () {
    module('templates');
    module('jusCafeApp');
    inject(function ($compile, $rootScope, $templateCache) {
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/business-types/business-types.html', '');
      element = $compile('<div results></div>')(scope);
      // including json from a file looks like a lot of work - http://stackoverflow.com/questions/17370427/loading-a-mock-json-file-within-karmaangularjs-test
      scope.serviceGroups = [
        {
          'title': 'group 1 title',
          'id': 'sg1',
          'description': 'group 1 desc',
          'services': [
            {
              'service_id': 'ffff-0001',
              'summary': 'service 1 summary',
              'title': 'service 1 title'
            },
            {
              'service_id': 'ffff-0002',
              'summary': 'service 2 summary',
              'title': 'service 2 title'
            }
          ]
        },
        {
          'title': 'group 2 title',
          'id': 'sg2',
          'description': 'group 2 desc',
          'services': [
            {
              'service_id': 'ffff-0003',
              'summary': 'service 3 summary',
              'title': 'service 3 title'
            }
          ]
        }
      ];
      scope.$apply();
    });
  });

  it('should have 2 groups', function () {
    expect(element[0].querySelectorAll('.jus-results-sg').length).toBe(2);
  });
  it('should have 3 services', function () {
    expect(element[0].querySelectorAll('.jus-results-service').length).toBe(3);
  });
  it("should include group 2's title", function () {
    expect(element.text()).toContain('group 2 title');
  });
  it("should include service 2's title", function () {
    expect(element.text()).toContain('service 2 title');
  });
});
