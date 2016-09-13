'use strict';

describe('Location storage', function () {
  beforeEach(module('locationStorage'));
  beforeEach(module('jusCafeApp'));

  var locationStorage;

  beforeEach(function () {
    inject(function (LocationStorage) {
      locationStorage = LocationStorage;
    });
  });

  it('Should get set values', function () {
    locationStorage.setValues('fred');
    expect(locationStorage.getValues()).toBe('fred');
  });

  it('Should clear values', function () {
    locationStorage.setValues('fred');
    expect(locationStorage.getValues()).toBe('fred');
    locationStorage.clear();
    expect(locationStorage.getValues()).toEqual([]);
  });
});

