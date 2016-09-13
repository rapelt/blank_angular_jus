'use strict';

describe('Service Details storage', function () {
  beforeEach(module('serviceDetails'));
  beforeEach(module('jusCafeApp'));

  var serviceDetailsStorage;

  beforeEach(function () {
    inject(function (ServiceDetailsStorage) {
      serviceDetailsStorage = ServiceDetailsStorage;
    });
  });

  it('Should get set values', function () {
    serviceDetailsStorage.setValues('fred');
    expect(serviceDetailsStorage.getValues()).toBe('fred');
  });

  it('Should clear set values', function () {
    serviceDetailsStorage.setValues('fred');
    expect(serviceDetailsStorage.getValues()).toBe('fred');
    serviceDetailsStorage.clear();
    expect(serviceDetailsStorage.getValues()).toEqual([]);
  });
});
