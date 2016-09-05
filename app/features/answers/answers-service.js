angular.module('answers', [])
  .factory('Answers', function () {
    var answers = {};
    return {
      getAnswers: function () {
        return answers;
      },
      setAnswer: function (answer) {
        answers[answer.id] = answer.answer;
      }
    };
  });
