
'use strict';

var waitForPage = require('../../utils/utils.js');
var resultsPage = require('../../pages/results/resultsPage.js');

describe('landing screen', function () {
  beforeEach(function () {
    browser.waitForAngular();
    browser.driver.get('http://localhost:9000/#/results');
  })

  it('should check the title', function () {
    waitForPage(function(){
      expect(browser.getCurrentUrl()).toContain("results");
    });
  });
});
