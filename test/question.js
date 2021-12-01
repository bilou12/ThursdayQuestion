const Question = artifacts.require("Question");

contract('Question', (accounts) => {
    let instance;

    let account1 = accounts[0];
    let account2 = accounts[1];

    beforeEach('setup contract for each test', async function () {
        instance = await Question.new(account1);
    })

    it('has an owner', async function () {
        assert.equal(await instance.owner(), account1);
    })

    it('should set question and good answer', async () => {
        const question = "question";
        const answer = 1;

        let res = await instance.setQuestionAndGoodAnswer(question, answer, {from: account1});
        //    await debug(res = instance.setQuestionAndGoodAnswer.call(question, answer, {from: account1}));

        let actualQuestion = await instance.getQuestion({from: account1});
        assert.equal(actualQuestion, question, "The question has not been properly defined");

        let actualGoodAnswer = await instance.getGoodAnswer({from: account1});
        assert.equal(actualGoodAnswer.toNumber(), answer, "The good answer has not been properly defined");
    });
});


