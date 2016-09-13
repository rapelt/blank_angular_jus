'use strict';

var waitForPage = require('../../utils/utils.js');
var landingPage = require('../../pages/landing/landingPage.js');

describe('landing screen', function () {
  beforeEach(function () {
    browser.driver.get(waitForPage.URL + '/#');
  });

  it('Verify the home page is hit', function () {
    waitForPage.wait(function () {
      landingPage.selectMobileFood();
    });
  });
});
