'use strict';

var landingPage = require('../../pages/landing/landingPage.js');

describe ('landing screen', function(){

	beforeEach(function(){
		browser.get('http://localhost:9001');
	});

 it('should check we are on the main QLD page',function() {
    expect(true).toBe(true);
  });

 it('should check the title', function(){
 	expect(browser.getCurrentUrl()).toContain("9001");
 }) ;
 it ('should take you to the Questions', function(){
 	element(by.id("questions-button")).click();
 	browser.sleep(2000);
 	expect(browser.getCurrentUrl()).toContain("9001");
 	element.all(by.css('.question-checkbox')).get(0).click();
 	browser.sleep(3000);
 	element.all(by.css('.question-checkbox')).get(2).click();
 	browser.sleep(2000);

 })


});
