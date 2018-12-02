const ChallengeToken = artifacts.require("./ChallengeToken.sol");

contract("ChallengeToken", accounts => {
  it("should create random number out of address", async () => {
    const contract = await ChallengeToken.deployed();

    // Set myString to "Hey there!"
    const totalSupply = await contract.totalSupply.call();
    const name = await contract.name.call();
    const decimals = await contract.decimals.call();
    const symbol = await contract.symbol.call();
    const balances = await contract.ballances.call();
    assert.equal("1000000", totalSupply.toString());
    assert.equal("ChallengeToken", name);
    assert.equal("8", decimals.toString());
    assert.equal("CHT", symbol);
    assert.equal("CHT", balances);
  });
});
