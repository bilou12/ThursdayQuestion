const mockedQuestion = artifacts.require("MockedQuestion");

module.exports = function(deployer) {
  deployer.deploy(mockedQuestion);
}