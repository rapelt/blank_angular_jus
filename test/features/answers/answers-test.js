describe('Answers: Service', function () {
  beforeEach(module('answers'));
  var answers;
  beforeEach(function () {
    inject(function (Answers) {
      answers = Answers;
    });
  });

  it('Should get answers', function () {
    expect(answers.getAnswers()).toEqual({});
  });

  it('Should get modified value of answers', function () {
    answers.setAnswer({id: '1a', answer: true});
    expect(answers.getAnswers()).toEqual({'1a': true});
  });

  it('should let users change internal state', function () {
    var anss = answers.getAnswers();
    anss['q1'] = true;
    expect(answers.getAnswers()).toEqual({'q1': true});
  });

  it('should give an array of keys for true answers', function () {
    answers.setAnswer({id: '1a', answer: true});
    answers.setAnswer({id: '2a', answer: false});
    var anss = answers.getTrueAnswerKeys();
    expect(anss).toEqual(['1a']);
  });
});
