
'use strict';

var landingPage = require('../../pages/landing/landingPage.js');

describe('landing screen', function () {
  beforeEach(function () {
    browser.get('http://localhost:9001');
  })

  it('should check the title', function () {
    expect(browser.getCurrentUrl()).toContain("9001");
    expect(landingPage.isCafeDisplayed()).toBeTruthy();
  });

  it('should take you to the Questions', function () {
    element.all(by.css('.business-type-box')).get(0).click();
    element.all(by.css('.business-type-box')).get(1).click();
    element(by.css('.oss-button')).click()
  });
});
