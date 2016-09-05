'use strict';

var ResultsPage = function () {
  this.categoryOne = element(by.id('heading-sg1'));
  this.categoryTwo = element(by.id('heading-sg2'));

  this.expandCategoryOne = function () {
    this.categoryOne.click();
  };

  this.expandCategoryTwo = function () {
    this.categoryTwo.click();
  };
};
module.exports = new ResultsPage();
