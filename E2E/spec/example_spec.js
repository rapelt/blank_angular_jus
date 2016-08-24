'use strict';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('angularjs homepage', function() {

  it('should check our CAFE PAGE',function() {
    browser.get('http://localhost:9001');
    expect(true).toBe(true);
  });
});
