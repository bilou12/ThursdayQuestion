pragma solidity >=0.4.25 <0.7.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Question is Ownable {
    mapping(address => int) map_player_answer;
    address[] players;
    int goodAnswer;
    string question;

    function abs(int x) private pure returns (int) {
        return x >= 0 ? x : - x;
    }

    function setAnswer(int _answer) public returns (bool) {
        players.push(msg.sender);
        map_player_answer[msg.sender] = _answer;
        return true;
    }

    function setQuestionAndGoodAnswer(string memory _question, int _goodAnswer) public onlyOwner returns (string memory, int) {
        question = _question;
        goodAnswer = _goodAnswer;
        return (question, goodAnswer);
    }

    function getQuestion() public view returns (string memory) {
        return question;
    }

    function getGoodAnswer() public view onlyOwner returns (int) {
        return goodAnswer;
    }

    function revealLoser() public view returns (address) {
        int distance = 0;
        address loser;

        for (uint i = 0; i < players.length; i++) {
            int answer = map_player_answer[players[i]];
            int newDistance = abs(answer - goodAnswer);
            if (newDistance > distance) {
                distance = newDistance;
                loser = players[i];
            }
        }

        return loser;
    }
}
