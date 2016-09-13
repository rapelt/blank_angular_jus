'use strict';

var ResultsPage = function () {
  this.categoryOne = element(by.id('heading-CodeofPractice'));
  this.categoryTwo = element(by.id('heading-Licence'));
  this.threadLessServices = element.all(by.repeater('service in serviceGroup.services'));

  this.expandCategoryOne = function () {
    this.categoryOne.click();
  };

  this.expandCategoryTwo = function () {
    this.categoryTwo.click();
  };

  this.countThreadlessServicesOnly = function () {
    this.threadLessServices.count();
  };
};

module.exports = new ResultsPage();
