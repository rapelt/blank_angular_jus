describe('Questions services', function () {
  beforeEach(module('data'));
  beforeEach(module('questionsStorage'));
  beforeEach(module('businessActivities'));
  beforeEach(module('questionsService'));
  beforeEach(module('serviceFilters'));
  beforeEach(module('locationStorage'));

  var questionsService, scope, deferredQuestions, deferredAnswers, deferredServices;

  var testQuestions = {
    '1q': {
      'id': '1q',
      'value': 'Will you advertise or promote your business?',
      'group_name': 'Services related to administrative duties you may need to conduct'
    },
    '2q': {
      'id': '2q',
      'value': 'How will you advertise or promote your business:',
      'parent_question_id': '1q'
    },
    '3q': {
      'id': '3q',
      'value': 'Will you need to use public spaces for any of your activities?',
      'group_name': 'Services related to administrative duties you may need to conduct'
    },
    '4q': {
      'id': '4q',
      'value': 'Will you employ staff or contractors?',
      'group_name': 'Employing staff or contractors in your business'
    }
  };

  var testAnswers = {
    '1a': {
      'id': '1a',
      'value': 'yes',
      'parent_question_id': '1q'
    },
    '2a': {
      'id': '2a',
      'value': 'Internet website',
      'parent_question_id': '2q'
    },
    '3a': {
      'id': '3a',
      'value': 'yes',
      'parent_question_id': '3q'
    },
    '4a': {
      'id': '4a',
      'value': 'Tv Marketing',
      'parent_question_id': '2q'
    },
    '5a': {
      'id': '5a',
      'value': 'yes',
      'parent_question_id': '4q'
    }

  };

  var testServices = {
    '01': {
      'id': '01',
      'business_activities': ['cafe', 'takeaway'],
      'location': ['brisbane'],
      'name': 'service name 01',
      'parent_answer_ids': ['2a', '4a']
    },
    '02': {
      'id': '02',
      'business_activities': ['cafe'],
      'location': ['brisbane'],
      'name': 'service name 01',
      'parent_answer_ids': ['1a', '3a']
    }
  };

  var businessActivityValues = {
    cafe: true,
    mobile: false,
    takeaway: false
  };

  function setDummyBusinessActivities (cafe, mobile, takeaway) {
    businessActivityValues.cafe = cafe;
    businessActivityValues.mobile = mobile;
    businessActivityValues.takeaway = takeaway;
  }

  beforeEach(function () {
    inject(function (QuestionsService, $rootScope, $q, DataRepository, BusinessActivities) {
      questionsService = QuestionsService;
      scope = $rootScope.$new();

      deferredQuestions = $q.defer();
      deferredAnswers = $q.defer();
      deferredServices = $q.defer();

      spyOn(DataRepository, 'getQuestions').and.returnValue(deferredQuestions.promise);
      spyOn(DataRepository, 'getAnswers').and.returnValue(deferredAnswers.promise);
      spyOn(DataRepository, 'getServices').and.returnValue(deferredServices.promise);

      spyOn(BusinessActivities, 'getValues').and.returnValue(businessActivityValues);

      deferredQuestions.resolve({data: testQuestions});
      deferredAnswers.resolve(testAnswers);
      deferredServices.resolve(testServices);
    });
  });

  it('Should return all questions when all business activities are selected', function () {
    setDummyBusinessActivities(true, true, true);
    scope.$apply();
    questionsService.getQuestions().then(function (response) {
      expect(_.size(response['Services related to administrative duties you may need to conduct'].questions)).toBe(2);
    });
  });

  it('Should return 1 question when only takeaway is select', function () {
    setDummyBusinessActivities(false, false, true);
    questionsService.getQuestions().then(function (response) {
      expect(_.size(response['Services related to administrative duties you may need to conduct'].questions)).toBe(2);
    });
    scope.$apply();
  });

  it('Should return questions inside a group', function () {
    setDummyBusinessActivities(true, true, true);
    questionsService.getQuestions().then(function (response) {
      expect(response['Services related to administrative duties you may need to conduct']).toBeDefined();
      expect(_.size(response['Services related to administrative duties you may need to conduct'].questions)).toBe(2);
    });
    scope.$apply();
  });

  it('Should return question q1 with subquestions', function () {
    questionsService.getQuestions().then(function (response) {
      var subquestion = response['Services related to administrative duties you may need to conduct'].questions['1q'].answer.subquestion;
      expect(subquestion).toBeDefined();
      expect(_.size(subquestion.answers)).toBe(2);
    });
    scope.$apply();
  });

  it('Should return question q3 without subquestions', function () {
    questionsService.getQuestions().then(function (response) {
      expect(response['Services related to administrative duties you may need to conduct'].questions['3q'].answer).toBeUndefined();
    });
    scope.$apply();
  });
});
