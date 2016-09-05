'use strict';

var waitForPage = require('../../utils/utils.js');
var landingPage = require('../../pages/landing/landingPage.js');
var questionsPage = require('../../pages/questions/questionsPage.js');
var resultsPage = require('../../pages/results/resultsPage.js');

describe('landing screen', function () {
  beforeEach(function () {
    browser.driver.get('http://localhost:9001');
  });

  it('should check the title', function () {
    waitForPage(function () {
      expect(landingPage.isCafeDisplayed()).toBeTruthy();
      expect(browser.getCurrentUrl()).toContain('9001');
    });
  });
});
