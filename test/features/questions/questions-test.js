'use strict';

describe('Controller: QuestionsController', function () {

  // load the controller's module
  beforeEach(module('Questions'));

  var QuestionsController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    $controller('QuestionsController', {$scope: scope});
  }));
});
