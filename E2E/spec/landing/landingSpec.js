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

  it('Should Test the End to End User Flow', function () {
    waitForPage(function () {
      landingPage.clicksOnCafe();
      landingPage.clicksOnMobileFood();
      questionsPage.next();
      // On Questions Page
      expect(questionsPage.questionCheckbox.get(1).waitReady()).toBeTruthy();
      questionsPage.question();
      expect(questionsPage.questionSubcheckbox.get(0).waitReady()).toBeTruthy();
      questionsPage.question2();
      questionsPage.next();
      questionsPage.next();
      // On the Results Page
      resultsPage.expandCategoryOne();
    });
  });
});
