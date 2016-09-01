'use strict';

angular.module('QuestionsService', [])
  .factory('QuestionsService', function($http, QuestionsRepository){
    return {
      get: function(){
        return QuestionsRepository.get();
      }
    };
  });
