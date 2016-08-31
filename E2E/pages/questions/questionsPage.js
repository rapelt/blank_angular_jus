'use strict'; 

var QuestionsPage = function (){

	this.questionCheckbox = element.all(by.css('.checkbox'));
	this.nextbutton = element(by.css('.oss-next-button'));



	this.question = function(){
		this.questionCheckbox.get(0).click();
	};
	this.question2 = function(){
		this.questionCheckbox.get(2).click();
	}
	this.next = function(){
		this.nextbutton.click();
	}

};
module.exports = new QuestionsPage();