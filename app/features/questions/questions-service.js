'use strict';

angular.module('QuestionsService', [])
  .factory('QuestionsService', function($rootScope, $q, $http, QuestionsRepository, ServiceFilters){
    return {
      getQuestions: function(){


        var data = [QuestionsRepository.getQuestions(), QuestionsRepository.getAnswers(), QuestionsRepository.getServices()];

        return $q.all(data).then(function(values){
          var questions = values[0].data;
          var answers = values[1].data;
          var services = values[2].data;

          var serviceFilteredBusinessActivities = ServiceFilters.filterByBusinessActivities(services, $rootScope.businessActivities);

          var filteredServices = serviceFilteredBusinessActivities;



          // find answer keys that relate to these services

          var answerKeys = _.uniq(_.flatten(_.pluck(filteredServices, 'parent_answer_ids')));

          // get answers for those keys

          var answers = _.pick(answers, answerKeys);

          // find questions keys that relate to those answers

          var questionKeys =  _.pluck(answers, 'parent_question_id');

          // find questions that relate to those answers

          var questions1 = _.pick(questions,questionKeys);

          // find questions keys that are parents of those questions

          var questionKeys2 = _.pluck(questions1, 'parent_question_id');

          // combine the two sets of questions

          var questionKeys3 = _.uniq(_.union(questionKeys, questionKeys2));

          var questions3 = _.pick(questions, questionKeys3);

          // remove subquestions, leaving only primary questions

          var questions4 = _.pick(questions3, function(value) {
            return !value.parent_question_id;
          });

          // find subquestions

          var subquestions = _.omit(questions3, _.keys(questions4));

          var subquestions2 = _.mapObject(subquestions, function(subquestion) {
            var my_answers = _.pick(answers, function(answer) {
              return answer.parent_question_id === subquestion.id;
            });

            subquestion.answers = my_answers;

            return subquestion;
          });

          // add subquestions as children of primary questions

          var questions5 = _.mapObject(questions4, function(question) {
            // add any relevant subequstion in for this question
            var my_subquestions = _.filter(subquestions, function (subquestion) {
              return question.id == subquestion.parent_question_id;
            });
            if (my_subquestions.length > 0) {
              if (my_subquestions.length > 1) {
                // this should never happen
              }
              question.answer = {};
              question.answer.subquestion = my_subquestions[0];
            }
            return question;
          });

          return {groupid1:{group_name: "groupname", questions: questions5}};
        });
      }
    }
  });
