describe('Filters: Service', function () {
  beforeEach(module('businessActivities'));
  beforeEach(module('questionsStorage'));
  beforeEach(module('serviceFilters'));
  beforeEach(module('jusCafeApp'));

  var serviceFilters, storage, locationStorage;
  var stubServices = {
    '01': {
      'id': '01',
      'business_activities': ['cafe', 'takeaway'],
      'location': 'brisbane',
      'name': 'service name 01',
      'parent_answer_ids': ['2a', '4a']
    },
    '02': {
      'id': '02',
      'business_activities': ['cafe'],
      'location': 'any',
      'name': 'service name 01',
      'parent_answer_ids': ['1a', '3a']
    },
    '03': {
      'id': '03',
      'business_activities': ['cafe'],
      'location': 'brisbane',
      'name': 'service name 01',
      'parent_answer_ids': []
    }
  };

  var allLocationServices = {
    '01': {
      'id': '01',
      'business_activities': ['cafe', 'takeaway'],
      'location': 'brisbane',
      'name': 'service name 01',
      'parent_answer_ids': ['2a', '4a']
    },
    '02': {
      'id': '02',
      'business_activities': ['cafe'],
      'location': 'logan',
      'name': 'service name 01',
      'parent_answer_ids': ['1a', '3a']
    },
    '03': {
      'id': '03',
      'business_activities': ['cafe'],
      'location': 'valley',
      'name': 'service name 01',
      'parent_answer_ids': []
    }
  };

  beforeEach(function () {
    inject(function (ServiceFilters, QuestionsStorage, LocationStorage) {
      serviceFilters = ServiceFilters;
      storage = QuestionsStorage;
      locationStorage = LocationStorage;
    });
  });

  it('Should filter services by questions', function () {
    spyOn(storage, 'getTrueValueKeys').and.returnValue(['1a']);
    var filteredServices = serviceFilters.filterByQuestions(stubServices);
    expect(_.keys(filteredServices).length).toBe(1);
    expect(filteredServices['02'].id).toBe('02');
  });

  it('Should get threadless services', function () {
    var threadLessServices = serviceFilters.getThreadlessServices(stubServices);
    expect(_.keys(threadLessServices).length).toBe(1);
    expect(threadLessServices['03'].id).toBe('03');
  });

  it('Should return services all services when no location', function () {
    spyOn(locationStorage, 'getValues').and.returnValue([]);
    var filteredServices = serviceFilters.filterByLocations(stubServices);
    expect(filteredServices).toEqual(stubServices);
  });

  it('Should return services that have a location of any', function () {
    spyOn(locationStorage, 'getValues').and.returnValue(['logan']);
    var filteredServices = serviceFilters.filterByLocations(stubServices);
    expect(filteredServices).toEqual({'02': stubServices['02']});
  });

  it('Should return services that relate to a location', function () {
    spyOn(locationStorage, 'getValues').and.returnValue(['brisbane']);
    var filteredServices = serviceFilters.filterByLocations(stubServices);
    expect(filteredServices).toEqual(stubServices);
  });

  it('Should return services that relate to multiple locations', function () {
    spyOn(locationStorage, 'getValues').and.returnValue(['brisbane', 'valley']);
    var filteredServices = serviceFilters.filterByLocations(allLocationServices);
    expect(_.size(filteredServices)).toEqual(2);
  });

  it('Should return services when no questions are answered', function () {
    spyOn(storage, 'getTrueValueKeys').and.returnValue([]);
    var filteredServices = serviceFilters.filterByQuestions(stubServices);
    expect(filteredServices).toEqual(stubServices);
  });
});
