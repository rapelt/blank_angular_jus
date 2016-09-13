'use strict';

var waitForPage = require('../../utils/utils.js');
// var resultsPage = require('../../pages/results/resultsPage.js')

describe('results screen', function () {
  beforeEach(function () {
    browser.driver.get(waitForPage.URL + '/#/results');
  });

// it('shoud show threadless services', function () {
//   waitForPage(function () {
//     expect(element.all(by.repeater('service in serviceGroup.services')).count()).toEqual(9)
//   })
// })
});
