'use strict';

angular.module('QuestionsRepository', [])
  .factory('QuestionsRepository', function($http){
    return {
      getQuestions: function(){
        return  $http.get('../resources/questions.json');
      },

      getAnswers: function(){
        return  $http.get('../resources/answers.json');
      },

      getServices: function(){
        return  $http.get('../resources/services.json');
      }
    };
  });
