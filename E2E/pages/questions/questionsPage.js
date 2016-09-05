'use strict';

var QuestionsPage = function () {
  this.questionCheckbox = element.all(by.css('.checkbox'));
  this.questionSubcheckbox = element.all(by.css('.subcheckbox'));
  this.nextbutton = element(by.css('.jus-next-button'));

  this.question = function () {
    this.questionCheckbox.get(1).click();
  };
  this.question2 = function () {
    this.questionSubcheckbox.get(0).click();
  };
  this.next = function () {
    this.nextbutton.click();
  };
};
module.exports = new QuestionsPage();
