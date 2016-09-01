describe('Questions services', function(){
  beforeEach(module('QuestionsRepository'));
  beforeEach(module('QuestionsService'));
  var questionsService, scope, deferred;


  var cafeQuestion = {
    "id": "43f2deb6-720a-48be-911f-f29176acd965",
    "value": "We will ask you a question about a cafe?",
    "business_types":["cafe"],
    "answer": {
      "id": "820c6607-7830-407c-b394-cd91537409aa",
      "subquestion" : {
        "value": "Subquestion for ya",
        "answers":
          [
            {
              "id": "4cedcb3a-9732-4f05-a6a3-8dab656db5a1",
              "value": "An answer to a sub question"
            }
          ]
      }
    }
  };

  var takeawayQuestion = {
    "id": "53f2deb6-720a-48be-911f-f29176acd965",
    "value": "We will ask you a question about a takeaway?",
    "business_types":["takeaway"],
    "answer": {
      "id": "920c6607-7830-407c-b394-cd91537409aa"
    }
  };
  var cafeAndTakeawayQuestion = {
    "id": "53f2deb6-720a-48be-911f-f29176acd965",
    "value": "We will ask you a question about a cafe and takeaway?",
    "business_types":["takeaway","cafe"],
    "answer": {
      "id": "920c6607-7830-407c-b394-cd91537409aa"
    }
  };

  var testQuestions =
    [
      {
        "group_name": "This is a group",
        "questions": [ cafeQuestion, takeawayQuestion, cafeAndTakeawayQuestion ]
      }
    ];

  beforeEach(function(){
    inject(function(QuestionsService, $rootScope, $q, QuestionsRepository){
      questionsService = QuestionsService;
      scope = $rootScope.$new();
      deferred = $q.defer();
      spyOn(QuestionsRepository, 'get').and.returnValue(deferred.promise);
    });
  });
  
  it('Should return the questions for a group type', function(){
    deferred.resolve(testQuestions);
    questionsService.get({group_type:"This is a group"}).then(function(response){
      expect(response[0])
    })
  })

  it('Should return all questions when no business type selected', function(){
    deferred.resolve(testQuestions);
    questionsService.get().then(function (response) {
      expect(response[0].questions.length).toBe(testQuestions[0].questions.length);
    });
    scope.$apply();
  });

  xit('Should return questions related to cafes when cafes is selected', function(){
    deferred.resolve(testQuestions);
    questionsService.get(["cafe"]).then(function (response) {
      expect(response[0].questions.length).toBe(2);
      expect(response[0].questions[0].id).toBe(cafeQuestion.id);
      expect(response[0].questions[1].id).toBe(cafeAndTakeawayQuestion.id);
    });
    scope.$apply();
  });
});
