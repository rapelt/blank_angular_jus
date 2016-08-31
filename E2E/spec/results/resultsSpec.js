
'use strict';

var resultsPage = require('../../pages/results/resultsPage.js');

describe('landing screen', function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true;
    browser.driver.get('http://localhost:9000/#/results');
  })

  it('should check the title', function () {
    expect(browser.getCurrentUrl()).toContain("results");
  });
});
