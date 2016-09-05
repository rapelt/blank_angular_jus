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
});
