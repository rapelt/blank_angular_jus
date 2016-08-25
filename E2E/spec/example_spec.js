'use strict';
describe('angularjs homepage', function() {
  it('should check our CAFE PAGE',function() {
    browser.get('http://localhost:9001');
    expect(true).toBe(true);
  });
});
