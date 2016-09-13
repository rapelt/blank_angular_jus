'use strict';

describe('Questions storage', function () {
  beforeEach(module('questionsStorage'));
  beforeEach(module('jusCafeApp'));

  var questionsStorage;

  beforeEach(function () {
    inject(function (QuestionsStorage) {
      questionsStorage = QuestionsStorage;
    });
  });

  it('Should get set values', function () {
    questionsStorage.setValues('fred');
    expect(questionsStorage.getValues()).toBe('fred');
  });

  it('Should get set value', function () {
    questionsStorage.setValue({id: '1234', value: 'fred'});
    expect(questionsStorage.getValues()).toEqual({'1234': 'fred'});
  });

  it('Should clear set values', function () {
    questionsStorage.setValues('fred');
    expect(questionsStorage.getValues()).toBe('fred');
    questionsStorage.clear();
    expect(questionsStorage.getValues()).toEqual({});
  });

  it('Should get set values', function () {
    questionsStorage.setValue({id: '01', value: true});
    questionsStorage.setValue({id: '02', value: false});
    expect(questionsStorage.getTrueValueKeys()).toEqual(['01']);
  });
});
