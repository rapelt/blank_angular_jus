
'use strict';

var waitReady = require('../../utils/waitReady.js');
var waitForPage = require('../../utils/utils.js');
var questionsPage = require('../../pages/questions/questionsPage.js');

describe('questions screen', function () {
  beforeEach(function () {
    browser.waitForAngular();
    browser.get('http://localhost:9001/#/questions');
  });

  it('should check the title', function () {
    waitForPage(function(){
      expect(browser.getCurrentUrl()).toContain("#/questions");
    });
   });

  it('should be able to select differect questions', function(){
    waitForPage(function(){
      expect(questionsPage.questionCheckbox.get(1).waitReady()).toBeTruthy();
      questionsPage.question();
      expect(questionsPage.questionSubcheckbox.get(0).waitReady()).toBeTruthy();
      questionsPage.question2();
      questionsPage.next();
    });
  });
});
