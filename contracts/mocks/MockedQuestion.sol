pragma solidity ^0.5.16;

import "../Question.sol";

contract MockedQuestion is Question {
    function _mock_add_answer_to_map_player_answer(address _player, int _answer) public {
        map_player_answer[_player] = _answer;
        players.push(_player);
    }
}
