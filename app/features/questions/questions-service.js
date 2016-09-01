'use strict';

angular.module('QuestionsService', [])
  .factory('QuestionsService', function($http, QuestionsRepository){
    return {
      get: function(){
        return QuestionsRepository.get();//.then(function(response){
          //return response.data;
          /*var filteredQuestions = [];

          for(var g = 0; g < allQuestions.length; g++) {
            for(var q = 0; q < allQuestions[g].questions.length; q++){
              if(allQuestions[g].questions.business_types === undefined){
                filteredQuestions.push(allQuestions[g]);
              }
            }
          }
          return filteredQuestions;*/
       // });
      }
    };
  });
