
'use strict';

var waitForPage = require('../../utils/utils.js');
var resultsPage = require('../../pages/results/resultsPage.js');

describe('results screen', function () {
  beforeEach(function () {
    browser.waitForAngular();
    browser.driver.get('http://localhost:9001/#/results');
  })

  it('should check the title', function () {
    waitForPage(function(){
      expect(browser.getCurrentUrl()).toContain("results");
    });
  });
  it('should click throught the groups', function () {
    waitForPage(function(){
      resultsPage.expandCategoryOne();
      resultsPage.expandCategoryTwo();
    });
  });


});
