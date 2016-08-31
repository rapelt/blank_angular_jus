
'use strict';

var questionsPage = require('../../pages/questions/questionsPage.js');

describe('questions screen', function () {
  beforeEach(function () {
    browser.get('http://localhost:9000/#/questions');
  })

  it('should check the title', function () {
     expect(browser.getCurrentUrl()).toContain("#/questions");
   });

  it('should be able to select differect questions', function(){
    
    questionsPage.question()
    browser.sleep(1000)
    questionsPage.question2()
    browser.sleep(1000)
    questionsPage.next();
    browser.sleep(1000)


  });
});