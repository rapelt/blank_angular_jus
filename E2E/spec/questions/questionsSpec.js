'use strict';

require('../../utils/waitReady.js');
var waitForPage = require('../../utils/utils.js');
var questionsPage = require('../../pages/questions/questionsPage.js');
var locationPage = require('../../pages/location/locationPage.js');
var landingPage = require('../../pages/landing/landingPage.js');

describe('questions screen', function () {
  beforeEach(function () {
    console.log(waitForPage);
    browser.get(waitForPage.URL + '/#/questions');
  });

  it('Jump to Questions page and go back', function () {
    waitForPage.wait(function () {
      questionsPage.back();
      locationPage.back();
      expect(landingPage.isCafeBusinessActivitySelected()).toBeTruthy();
      expect(landingPage.isMobileFoodBusinessActivitySelected()).toBeTruthy();
      expect(landingPage.isTakeawayBusinessActivitySelected()).toBeTruthy();
    });
  });
});
