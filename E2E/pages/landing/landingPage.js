'use strict';

var LandingPage = function () {
  this.homePage = element(by.css('.home-page'));

  this.selectMobileFood = function () {
    return this.homePage.get(1);
  };
};
module.exports = new LandingPage();
