describe('Questions services', function(){
  beforeEach(module('QuestionsRepository'));
  beforeEach(module('QuestionsService'));
  var questionsService, scope, deferred;

  var testQuestions =
    [
      {
        "group_name": "Business activities you are likely to partake in",
        "questions":
        [
          {
            "id": "43f2deb6-720a-48be-911f-f29176acd965",
            "value": "Will you advertise or promote your business?",
            "answer": {
              "id": "820c6607-7830-407c-b394-cd91537409aa",
              "subquestion" : {
                "value": "How will you advertise or promote your business:",
                "answers":
                  [
                    {
                      "id": "4cedcb3a-9732-4f05-a6a3-8dab656db5a1",
                      "value": "Internet website"
                    },
                    {
                      "id": "d2b7214c-78ea-4495-922a-4db5e6b0035d",
                      "value": "Distribute brochures, flyers or promotional materials"
                    }
                  ]
              }
            }
          }
        ]
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

  it('Should return all questions when no business type selected', function(){
    deferred.resolve(testQuestions);
    questionsService.get().then(function (response) {
      expect(response.length).toBe(testQuestions.length);
    });
    scope.$apply();
  });
});
