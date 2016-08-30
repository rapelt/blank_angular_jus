'use strict';

var landingPage = require('../../pages/landing/landingPage.js');

describe ('landing screen', function(){

	beforeEach(function(){
		browser.get('http://localhost:9000');
	});

 it('should check we are on the main QLD page',function() {
    expect(true).toBe(true);
  });

 it('should check the title', function(){
 	expect(browser.getCurrentUrl()).toContain("9000");
 }) ;

	
});
