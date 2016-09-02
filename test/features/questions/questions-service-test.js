describe('Questions services', function(){
  beforeEach(module('QuestionsRepository'));
  beforeEach(module('QuestionsService'));
  beforeEach(module('ServiceFilters'));

  var questionsService, scope, deferredQuestions, deferredAnswers, deferredServices;



  var testQuestions = {
    "1q": {
      "id": "1q",
      "value": "Will you advertise or promote your business?"
    },
    "2q": {
      "id": "2q",
      "value": "How will you advertise or promote your business:",
      "parent_question_id": "1q"
    },
    "3q": {
      "id": "3q",
      "value": "Will you need to use public spaces for any of your activities?"
    }
  };

  var testAnswers ={
    "1a": {
      "id": "1a",
      "value": "yes",
      "parent_question_id": "1q"
    },
    "2a": {
      "id": "2a",
      "value": "Internet website",
      "parent_question_id": "2q"
    },
    "3a": {
      "id": "3a",
      "value": "yes",
      "parent_question_id": "3q"
    },
    "4a": {
      "id": "4a",
      "value": "Tv Marketing",
      "parent_question_id": "2q"
    }
  };

  var testServices = {
    "01": {
      "id": "01",
      "business_activities": ["cafe", "takeaway"],
      "location": ["brisbane"],
      "name": "service name 01",
      "parent_answer_ids": ["2a", "3a", "4a"]
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

    });
  });


  it('Should return all questions when all business activities are select', function(){
    deferredQuestions.resolve({data: testQuestions});
    deferredAnswers.resolve({data: testAnswers});
    deferredServices.resolve({data: testServices});
    questionsService.getQuestions().then(function (response) {
      expect(_.size(response.groupid1.questions)).toBe(2);
    });
    scope.$apply();
  });
});
