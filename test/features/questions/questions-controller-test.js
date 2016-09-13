'use strict';

describe('Questions controller', function () {
  beforeEach(module('questions'));
  beforeEach(module('jusCafeApp'));
  var questionsService, dataRepository, deferredLocationLogan, deferredLocationBrisbane, scope, state, deferredQuestions, deferredAnswers;
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
    dataRepository = jasmine.createSpyObj('dataRepository', ['getAnswers']);

    inject(function ($rootScope, $controller, $q, $templateCache, $state, LocationRepository) {
      state = $state;
      scope = $rootScope.$new();
      $templateCache.put('features/home/home.html', '');
      $templateCache.put('features/business-activities/business-activities.html', '');
      $templateCache.put('features/questions/questions.html', '');

      deferredLocationBrisbane = $q.defer();
      deferredLocationLogan = $q.defer();
      deferredQuestions = $q.defer();
      deferredAnswers = $q.defer();

      questionsService.getQuestions.and.returnValue(deferredQuestions.promise);
      dataRepository.getAnswers.and.returnValue(deferredAnswers.promise);
      deferredAnswers.resolve(
        {
          '2a': {
            'parent_question_id': '1q',
            'id': '2a',
            'value': "Use street furniture, such as sandwich 'A' boards, planter boxes or barriers"
          },
          '4a': {
            'parent_question_id': '2q',
            'id': '4a',
            'value': 'Land titles'
          }
        }
      );

      spyOn(LocationRepository, 'getBrisbaneLocation').and.returnValue(deferredLocationBrisbane.promise);
      spyOn(LocationRepository, 'getLoganLocation').and.returnValue(deferredLocationLogan.promise);

      $controller('QuestionsController', {$scope: scope, $state: state, QuestionsService: questionsService, DataRepository: dataRepository});
    });
  });

  it('should load questions page', function () {
    state.go('questions');
    scope.$apply();
    expect(state.current.controller).toBe('QuestionsController');
    expect(state.current.url).toBe('/questions');
  });

  it('Should get questions', function () {
    deferredQuestions.resolve('fred');
    scope.$apply();
    expect(scope.ablisData).toBe('fred');
  });

  it('Should increase page number when next button is called', function () {
    deferredQuestions.resolve({'data': 'fred'});
    scope.groups = ['page1', 'page2'];
    scope.showNextPage();
    scope.$apply();
    expect(scope.page).toBe(1);
  });

  it('Should go to the results page if no more questions', function () {
    deferredQuestions.resolve({'data': 'fred'});
    scope.groups = ['page1', 'page2'];
    scope.page = 1;
    scope.showNextPage();
    scope.$apply();
    expect(state.current.url).toBe('/results');
  });

  it('Should decrease page number when previous button is called', function () {
    deferredQuestions.resolve({'data': 'fred'});
    scope.page = 1;
    scope.$apply();
    scope.showPreviousPage();
    expect(scope.page).toBe(0);
  });

  it('Should clear subquestion storage when primary question is closed or opened', function () {
    scope.$apply();
    scope.ablisData = testAblisData;
    state.go('questions');
    scope.page = 0;
    scope.qanswers = {'1q': false, '2a': true, '4a': false};
    scope.updateQanswers('1q');
    expect(scope.qanswers['2a']).toBe(false);
  });
});
