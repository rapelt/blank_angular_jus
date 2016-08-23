'use strict';

describe('Controller: AboutCtrl', function () {

  beforeEach(module('ossCafeApp'));
  var AboutCtrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope, $state) {
    scope = $rootScope.$new();
    $controller('AboutCtrl', {$scope: scope});
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
