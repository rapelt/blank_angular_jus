'use strict';

var LandingPage = function (){

	this.triageChoice = element.all(by.css('.box'));

	this.isCafeDisplayed = function(){
		return this.triageChoice.get(0).isDisplayed();
	};
};
module.exports = new LandingPage();
