'use strict';

angular.module('AblisData', [])
  .factory('QuestionsService', function($http){
    return {
      
      get: function(){
        return $http.get('../resources/questions.json');
      }
    };
  });
