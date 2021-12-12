//const Question = artifacts.require("MockedQuestion");
const Question = artifacts.require("Question");

contract('Question', (accounts) => {
    let instance;

    let account1 = accounts[0];
    let account2 = accounts[1];
    let account3 = accounts[2];

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
        //    await debug(res = instance.setQuestionAndGoodAnswer(question, answer, {from: account1}));

        let actualQuestion = await instance.getQuestion({from: account1});
        assert.equal(actualQuestion, question, "The question has not been properly defined");

        let actualGoodAnswer = await instance.getGoodAnswer({from: account1});
        assert.equal(actualGoodAnswer.toNumber(), answer, "The good answer has not been properly defined");
    });

    it('should allow only owner to setQuestionAndGoodAnswer', async() => {
        const question = "question";
        const answer = 1;

        try {
            let res = await instance.setQuestionAndGoodAnswer(question, answer, {from: account2});
        } catch (e) {
//            console.log(`e: ${e}`)
            assert.equal(e,
                "Error: Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.",
                "The function can be called by not only the owner")
        }
    });

    it('should reveal the correct loser', async() => {
        const question = "question";
        const answer = 1;

        let res = await instance.setQuestionAndGoodAnswer(question, answer, {from: account1});

//        await instance._mock_add_answer_to_map_player_answer(account1, 1);
//        await instance._mock_add_answer_to_map_player_answer(account2, 2);
////        await debug(instance._mock_add_answer_to_map_player_answer(account2, 2));
//
////        let res = await instance.revealLoser();
//        await debug(actualLoser = instance.revealLoser());

        let bla1 = await instance.setAnswer(2, {from: account1})
        let bla2 = await instance.setAnswer(10, {from: account2})
        let bla3 = await instance.setAnswer(5, {from: account3})

        let actualLoser = await instance.revealLoser({from: account1});

        console.log(`actualLoser: ${actualLoser}`)

        assert.equal(actualLoser, account2, 'The loser is not the one expected')
    });

    it('should transfer ownership to the loser', async() => {
        const question = "question";
        const answer = 1;

        let res1 = await instance.setQuestionAndGoodAnswer(question, answer, {from: account1});

        let bla1 = await instance.setAnswer(2, {from: account1})
        let bla2 = await instance.setAnswer(10, {from: account2})
        let bla3 = await instance.setAnswer(5, {from: account3})

        // assert that account1 is the owner
        let actualGoodAnswer = await instance.getGoodAnswer({from: account1});
        assert.equal(actualGoodAnswer.toNumber(), answer, "The good answer has not been properly defined");

        // assert that account2 is the loser
        let tx = await instance.processResults({from: account1});
        let actualLoserAndNewOwner = tx.receipt.logs[0].args.newOwner;
        assert.equal(actualLoserAndNewOwner, account2, 'The loser is not the one expected')

        // assert that account2 has become the owner
        let actualGoodAnswer2 = await instance.getGoodAnswer({from: actualLoserAndNewOwner});
        assert.equal(actualGoodAnswer2.toNumber(), answer, "The good answer has not been properly defined");
    });
});


