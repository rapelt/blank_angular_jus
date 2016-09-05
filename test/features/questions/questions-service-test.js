describe('Questions services', function(){
  beforeEach(module('QuestionsRepository'));
  beforeEach(module('QuestionsService'));
  beforeEach(module('ServiceFilters'));

  var questionsService, scope, deferredQuestions, deferredAnswers, deferredServices, rootScope;



  var testQuestions = {
    "q1": {
      "id": "q1",
      "value": "Will you advertise or promote your business?"
    },
    "q2": {
      "id": "q2",
      "value": "How will you advertise or promote your business:",
      "parent_question_id": "q1"
    },
    "q3": {
      "id": "q3",
      "value": "Will you need to use public spaces for any of your activities?"
    }
  };

  var testAnswers ={
    "1a": {
      "id": "1a",
      "value": "yes",
      "parent_question_id": "q1"
    },
    "2a": {
      "id": "2a",
      "value": "Internet website",
      "parent_question_id": "q2"
    },
    "3a": {
      "id": "3a",
      "value": "yes",
      "parent_question_id": "q3"
    },
    "4a": {
      "id": "4a",
      "value": "Tv Marketing",
      "parent_question_id": "q2"
    }
  };

  var testServices = {
    "01": {
      "id": "01",
      "business_activities": ["cafe", "takeaway"],
      "location": ["brisbane"],
      "name": "service name 01",
      "parent_answer_ids": ["2a", "4a"]
    },
    "02": {
      "id": "02",
      "business_activities": ["cafe"],
      "location": ["brisbane"],
      "name": "service name 01",
      "parent_answer_ids": ["1a", "3a"]
    }
  };


    beforeEach(function(){
    inject(function(QuestionsService, $rootScope, $q, QuestionsRepository){
      questionsService = QuestionsService;
      scope = $rootScope.$new();
      rootScope = $rootScope;
      $rootScope.businessActivities = $rootScope.businessActivities ? $rootScope.businessActivities : {
        cafe: true,
        mobileFood: true,
        takeaway: true
      };

      deferredQuestions = $q.defer();
      deferredAnswers = $q.defer();
      deferredServices = $q.defer();

      spyOn(QuestionsRepository, 'getQuestions').and.returnValue(deferredQuestions.promise);
      spyOn(QuestionsRepository, 'getAnswers').and.returnValue(deferredAnswers.promise);
      spyOn(QuestionsRepository, 'getServices').and.returnValue(deferredServices.promise);

      deferredQuestions.resolve({data: testQuestions});
      deferredAnswers.resolve({data: testAnswers});
      deferredServices.resolve({data: testServices});
    });
  });


  it('Should return all questions when all business activities are select', function(){
    questionsService.getQuestions().then(function (response) {
      expect(_.size(response.groupid1.questions)).toBe(2);
    });
    scope.$apply();
  });

  it('Should return 1 question when only takeaway is select', function(){
    rootScope.businessActivities = {
      cafe: false,
      mobileFood: false,
      takeaway: true
    };

    questionsService.getQuestions().then(function (response) {
      expect(_.size(response.groupid1.questions)).toBe(1);
    });
    scope.$apply();
  });

  it('Should return all questions when all business activities are select', function(){
    questionsService.getQuestions().then(function (response) {
      expect(_.size(response.groupid1.questions)).toBe(2);
    });
    scope.$apply();
  });

  it('Should return questions inside a group', function(){
    questionsService.getQuestions().then(function (response) {
      expect(response.groupid1).toBeDefined();
      expect(_.size(response.groupid1.questions)).toBe(2);
    });
    scope.$apply();
  });

  it('Should return question q1 with subquestions', function(){
    questionsService.getQuestions().then(function (response) {
      var subquestion = response.groupid1.questions.q1.answer.subquestion;
      expect(subquestion).toBeDefined();
      expect(_.size(subquestion.answers)).toBe(2);
    });
    scope.$apply();
  });

  it('Should return question q3 without subquestions', function(){
    questionsService.getQuestions().then(function (response) {
      expect(response.groupid1.questions.q3.answer).toBeUndefined();
    });
    scope.$apply();
  });
});
