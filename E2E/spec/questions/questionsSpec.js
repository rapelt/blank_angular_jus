
'use strict';

var waitReady = require('../../utils/waitReady.js');
var questionsPage = require('../../pages/questions/questionsPage.js');

describe('questions screen', function () {
  beforeEach(function () {
    browser.waitForAngular();
    browser.get('http://localhost:9000/#/questions');
  })

  it('should check the title', function () {
     expect(browser.getCurrentUrl()).toContain("#/questions");
   });

  it('should be able to select differect questions', function(){
    expect(questionsPage.questionCheckbox.get(0).waitReady()).toBeTruthy();
    questionsPage.question();
    expect(questionsPage.questionCheckbox.get(2).waitReady()).toBeTruthy();
    questionsPage.question2();
    questionsPage.next();
  });
});
