'use strict';

angular.module('QuestionsService', [])
  .factory('QuestionsService', function($rootScope, $http, QuestionsRepository, ServiceFilters){
    return {
      getQuestions: function(){

        var data = [QuestionsRepository.getQuestions(), QuestionsRepository.getAnswers(), QuestionsRepository.getServices()];

        return Promise.all(data).then(function(values){
          var questions = values[0].data;
          var answers = values[1].data;
          var services = values[2].data;

          var serviceFilteredBusinessActivities = ServiceFilters.filterByBusinessActivities(services, $rootScope.businessActivities);

          var filteredServices = serviceFilteredBusinessActivities;



          // find answer keys that relate to these services

          var answerKeys = _.uniq(_.flatten(_.pluck(filteredServices, 'parent_answer_ids')));

          // get answers for those keys

          var answers = _.pick(answers, answerKeys);

          console.log('answer', answers);

          // find questions keys that relate to those answers

          var questionKeys =  _.pluck(answers, 'parent_question_id');

          console.log('questionKeys', questionKeys);

          // find questions that relate to those answers

          var questions1 = _.pick(questions,questionKeys);

          console.log('questions1', questions1);

          // find questions keys that are parents of those questions

          var questionKeys2 = _.pluck(questions1, 'parent_question_id');

          // combine the two sets of questions

          var questionKeys3 = _.uniq(_.union(questionKeys, questionKeys2));

          console.log('questionkeys3', questionKeys3);

          var questions3 = _.pick(questions, questionKeys3);

          console.log('questions3', questions3);


          // remove subquestions, leaving only primary questions

          var questions4 = _.pick(questions3, function(value) {
            return !value.parent_question_id;
          });
          console.log('questions4', questions4);

          // find subquestions

          var subquestions = _.omit(questions3, _.keys(questions4));

          console.log("subquestions", subquestions);


          var subquestions2 = _.mapObject(subquestions, function(subquestion) {
            var my_answers = _.pick(answers, function(answer) {
              console.log('thino', answers, subquestion);
              return answer.parent_question_id === subquestion.id;
            });

            console.log('sq2 answers', my_answers);
            subquestion.answers = my_answers;

            return subquestion;
          });

          console.log('subquestions2', subquestions2);



          // add subquestions as children of primary questions

          var questions5 = _.mapObject(questions4, function(question) {
            // add any relevant subequstion in for this question
            var my_subquestions = _.filter(subquestions, function (subquestion) {
              return question.id == subquestion.parent_question_id;
            });
            console.log("my_subquestions", my_subquestions);
            if (my_subquestions.length > 0) {
              console.log("setting subquestions");
              if (my_subquestions.length > 1) {
                // this should never happen
              }
              question.answer = {};
              question.answer.subquestions = my_subquestions[0];
            }
            return question;
          });
          console.log('questions5', questions5);








          console.log(serviceFilteredBusinessActivities);
          return serviceFilteredBusinessActivities;
        });
      }
    }
  });
