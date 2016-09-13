'use strict';

var LocationPage = function () {
  this.nextbutton = element(by.css('.jus-next-button'));
  this.backButton = element(by.css('.jus-back-button'));

  this.next = function () {
    this.nextbutton.click();
  };
  this.back = function () {
    this.backButton.click();
  };
};
module.exports = new LocationPage();
