'use strict';

angular.module('QuestionsRepository', [])
  .factory('QuestionsRepository', function($http){
    return {
      get: function(){
        return  $http.get('../resources/questions.json');
      }
    };
  });
