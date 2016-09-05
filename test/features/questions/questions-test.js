'use strict';

describe('Questions controller', function () {
  beforeEach(module('jusCafeApp'));
  var questionsService, scope, state, deferred, rootScope;

  var testAblisData = {
    'groupid1': {
      'group_name': 'groupname',
      'questions': {
        '3q': {'id': '3q', 'value': 'Will you need to use public spaces for any of your activities?'},
        '1q': {
          'id': '1q',
          'value': 'Will you advertise or promote your business?',
          'answer': {
            'subquestion': {
              'id': '2q',
              'value': 'How will you advertise or promote your business:',
              'parent_question_id': '1q',
              'answers': {
                '2a': {'id': '2a', 'value': 'Internet website', 'parent_question_id': '2q'},
                '4a': {'id': '4a', 'value': 'Tv Marketing', 'parent_question_id': '2q'}
              }
            }
          }
        }
      }
    }
  };

  beforeEach(function () {
    questionsService = jasmine.createSpyObj('questionService', ['getQuestions']);
    inject(function ($rootScope, $controller, $q, $templateCache, $state) {
      state = $state;
      scope = $rootScope.$new();
      rootScope = $rootScope;
      $templateCache.put('features/home/main.html', '');
      $templateCache.put('features/business-types/business-types.html', '');
      $templateCache.put('features/questions/questions.html', '');

      deferred = $q.defer();

      questionsService.getQuestions.and.returnValue(deferred.promise);

      $controller('QuestionsController', {$scope: scope, $state: state, QuestionsService: questionsService});
    });
  });

  it('should load questions page', function () {
    state.go('questions');
    scope.$apply();
    expect(state.current.controller).toBe('QuestionsController');
    expect(state.current.url).toBe('/questions');
  });

  it('Should get questions', function () {
    deferred.resolve('fred');
    scope.$apply();
    expect(scope.ablisData).toBe('fred');
  });

  it('Should increase page number when next button is called', function () {
    deferred.resolve({'data': 'fred'});
    scope.groups = ['page1', 'page2'];
    scope.showNextPage();
    scope.$apply();
    expect(scope.page).toBe(1);
  });

  it('Should go to the results page if no more questions', function () {
    deferred.resolve({'data': 'fred'});
    scope.groups = ['page1', 'page2'];
    scope.page = 1;
    scope.showNextPage();
    scope.$apply();
    expect(state.current.url).toBe('/results');
  });

  it('Should decrease page number when previous button is called', function () {
    deferred.resolve({'data': 'fred'});
    scope.page = 1;
    scope.$apply();
    scope.showPreviousPage();
    expect(scope.page).toBe(0);
  });

  it('Should return to home when previous button is called', function () {
    state.go('questions');
    scope.page = 0;
    scope.$apply();
    expect(state.current.url).toBe('/questions');
    scope.showPreviousPage();
    scope.$apply();
    expect(state.current.url).toBe('/');
  });

  it('Should clear subquestion answers when primary question is closed or opened', function () {
    scope.ablisData = testAblisData;
    state.go('questions');
    scope.page = 0;
    scope.qanswers = {'1q': false, '2a': true, '4a': false};
    scope.updateQanswers('1q');
    scope.$apply();
    expect(scope.qanswers['2a']).toBe(false);
  });
});
