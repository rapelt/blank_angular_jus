
'use strict';

var resultsPage = require('../../pages/results/resultsPage.js');

describe('landing screen', function () {
  beforeEach(function () {
    browser.get('http://localhost:9000/#/results');
  })

  it('should check the title', function () {
    expect(browser.getCurrentUrl()).toContain("results");
  });
});
