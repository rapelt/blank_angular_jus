'use strict';

var waitForPage = require('../../utils/utils.js');
var landingPage = require('../../pages/landing/landingPage.js');

describe('landing screen', function () {
  beforeEach(function () {
    browser.driver.get(waitForPage.URL + '/#');
    landingPage.startButtonNext();
  });

  it('Verify next button is disabled with no selected Business Activity', function () {
    waitForPage.wait(function () {
      expect(landingPage.checkNextButtonEnabled()).toBeFalsy();
    });
  });

  it('Verify all 3 Business Activities are Visible', function () {
    waitForPage.wait(function () {
      expect(landingPage.checkBusinessActivitiesVisible()).toEqual(3);
    });
  });

  xit('Verify all 3 Business Activities can be selected', function () {
    waitForPage.wait(function () {
      landingPage.selectAllBusinessActivities();
      expect(landingPage.areAllBusinessActivitiesSelected()).toBeTruthy();
      expect(landingPage.checkNextButtonEnabled()).toBeTruthy();
    });
  });
});
