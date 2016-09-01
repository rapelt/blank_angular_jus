
'use strict';

var waitForPage = require('../../utils/utils.js');
var landingPage = require('../../pages/landing/landingPage.js');

describe('landing screen', function () {
  beforeEach(function () {
		browser.driver.get('http://localhost:9001');
  });

  it('should check the title', function () {
    waitForPage(function(){
      expect(landingPage.isCafeDisplayed()).toBeTruthy();
      expect(browser.getCurrentUrl()).toContain("9001");
    });
  });

  it('should take you to the Questions', function () {
    waitForPage(function(){
      element.all(by.css('.box')).get(0).click();
      element.all(by.css('.box')).get(1).click();
      element(by.css('.oss-button')).click()
    });
  });
});
