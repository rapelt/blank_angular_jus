
'use strict';

var landingPage = require('../../pages/landing/landingPage.js');

describe('landing screen', function () {
  beforeEach(function () {
    browser.get('http://localhost:9001')
  });

  it('should check we are on the main QLD page', function () {
    expect(true).toBe(true)
  });

  it('should check the title', function () {
    expect(browser.getCurrentUrl()).toContain('9001')
  });

  it('should take you to the Questions', function () {
<<<<<<< 584729eddc7337e9315c790e6c6148fd0728503d
    element.all(by.css('.business-type-box')).get(0).click();
    element.all(by.css('.business-type-box')).get(1).click();
    element(by.css('.oss-button')).click()
=======
    element.all(by.css('.business-type-box')).get(0).click()
    element.all(by.css('.business-type-box')).get(1).click()
    element(by.css('.os-button')).click()
>>>>>>> [TS] failed the functional test to verify build pipeline
  })
});
