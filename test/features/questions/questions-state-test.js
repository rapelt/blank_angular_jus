'use strict';

describe('Questions controller', function () {
  beforeEach(module('questions'));
  beforeEach(module('jusCafeApp'));

  var questionsService, dataRepository, scope, state, deferred;

  beforeEach(function () {
    questionsService = jasmine.createSpyObj('questionService', ['getQuestions']);
    dataRepository = jasmine.createSpyObj('dataRepository', ['getAnswers']);

    inject(function ($rootScope, $controller, $location, $q, $templateCache) {
      scope = $rootScope.$new();
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/business-activities/business-activities.html', '');
      $templateCache.put('features/questions/questions.html', '');

      deferred = $q.defer();

      questionsService.getQuestions.and.returnValue(deferred.promise);
      dataRepository.getAnswers.and.returnValue(deferred.promise);

      state = {
        go: function () {
          return $location.path('/business-activities');
        },
        current: {
          controller: 'LocationController',
          url: '/location'
        },
        resolve: {
          brisbane: function () { return; }
        }
      };

      $controller('QuestionsController', {$scope: scope, $state: state, QuestionsService: questionsService, DataRepository: dataRepository});
    });
  });

  it('Should return to location when previous button is called', function () {
    state.go('questions');
    scope.page = 0;
    scope.showPreviousPage();
    scope.$apply();
    expect(state.current.url).toBe('/location');
  });
});
