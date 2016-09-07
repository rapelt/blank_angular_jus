describe('Filters: Service', function () {
  beforeEach(module('ServiceFilters'));
  beforeEach(module('answers'));
  var serviceFilters, answers;
  var stubServices = {
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

  var stubQAnswers = {'1a': true};

  beforeEach(function () {
    inject(function (ServiceFilters, Answers) {
      serviceFilters = ServiceFilters;
      answers = Answers;
    });
  });

  it('Should filter services by questions', function () {
    spyOn(answers, 'getTrueAnswerKeys').and.returnValue(['1a']);
    var filteredServices = serviceFilters.filterByQuestions(stubServices);
    expect(_.keys(filteredServices).length).toBe(1);
    expect(filteredServices['02'].id).toBe('02');
  });
});
