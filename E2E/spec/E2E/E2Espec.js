'use strict';

var waitForPage = require('../../utils/utils.js');
var landingPage = require('../../pages/landing/landingPage.js');

xdescribe('landing screen', function () {
  beforeEach(function () {
    browser.get(waitForPage.URL + '/#');
  });

  xit('Business Activities persist through page URL change', function () {
    waitForPage.wait(function () {
      landingPage.selectMobileFood();
      browser.sleep('2000');
      landingPage.nextButton.click();
      browser.get(waitForPage.URL + '/#/result');
      browser.sleep('2000');
      browser.get(waitForPage.URL);
      browser.sleep('2000');
      expect(landingPage.isMobileFoodBusinessActivitySelected()).toBeTruthy();
      browser.sleep('2000');
    });
  });
});
