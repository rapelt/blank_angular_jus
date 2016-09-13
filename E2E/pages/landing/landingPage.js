'use strict';

var LandingPage = function () {
  this.allBusinessActivities = element.all(by.css('.box'));
  this.cafeBusinessActivity = element(by.model('businessActivities.cafe'));
  this.mobileFoodBusinessActivity = element(by.model('businessActivities.mobile'));
  this.takeawayBusinessActivity = element(by.model('businessActivities.takeaway'));
  this.nextButton = element(by.css('.jus-next-button'));
  this.startButton = element(by.id('jus-start-button'));

  this.checkNextButtonEnabled = function () {
    return this.nextButton.isEnabled();
  };

  this.checkBusinessActivitiesVisible = function () {
    return this.allBusinessActivities.count();
  };

  this.selectAllBusinessActivities = function () {
    return this.allBusinessActivities.click();
  };

  this.startButtonNext = function () {
    return this.startButton.click();
  };

  this.areAllBusinessActivitiesSelected = function () {
    return this.allBusinessActivities.isSelected();
  };

  this.isCafeBusinessActivitySelected = function () {
    return this.cafeBusinessActivity.isSelected();
  };

  this.isMobileFoodBusinessActivitySelected = function () {
    return this.mobileFoodBusinessActivity.isSelected();
  };

  this.isTakeawayBusinessActivitySelected = function () {
    return this.takeawayBusinessActivity.isSelected();
  };

  this.isCafeDisplayed = function () {
    return this.allBusinessActivities.get(0).isDisplayed();
  };

  this.selectCafe = function () {
    return this.allBusinessActivities.get(0).click();
  };

  this.selectMobileFood = function () {
    return this.allBusinessActivities.get(1).click();
  };
};
module.exports = new LandingPage();
