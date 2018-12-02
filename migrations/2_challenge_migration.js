var ChallengeToken = artifacts.require("./ChallengeToken.sol");
var Whitelist = artifacts.require("./Whitelist.sol");

module.exports = function(deployer) {
  deployer.deploy(Whitelist).then(() => deployer.deploy(ChallengeToken, Whitelist.address));
};
