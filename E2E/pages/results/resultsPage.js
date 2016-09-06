'use strict';

var ResultsPage = function () {
  this.categoryOne = element(by.id('heading-CodeofPractice'));
  this.categoryTwo = element(by.id('heading-Licence'));

  this.expandCategoryOne = function () {
    this.categoryOne.click();
  };

  this.expandCategoryTwo = function () {
    this.categoryTwo.click();
  };
};
module.exports = new ResultsPage();
