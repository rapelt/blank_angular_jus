'use strict';

var LandingPage = function (){

	this.triageChoice = element.all(by.css('.box'));

	this.isCafeDisplayed = function(){
		return this.triageChoice.get(0).isDisplayed();
	};

	this.clicksOnCafe = function(){
		return this.triageChoice.get(0).click();
	};

	this.clicksOnMobileFood = function(){
		return this.triageChoice.get(1).click();
	};

};
module.exports = new LandingPage();
