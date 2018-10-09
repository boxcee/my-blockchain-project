var Test = artifacts.require("./Test.sol");
var MyStringStore = artifacts.require("./MyStringStore.sol");

module.exports = function(deployer) {
  deployer.deploy(Test);
  deployer.deploy(MyStringStore);
};
