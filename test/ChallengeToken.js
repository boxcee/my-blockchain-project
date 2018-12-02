const ChallengeToken = artifacts.require('./ChallengeToken.sol');
const WhiteList = artifacts.require('./Whitelist.sol');

contract('ChallengeToken', (accounts) => {
  it('should be readable', async () => {
    const contract = await ChallengeToken.deployed();

    const totalSupply = await contract.totalSupply.call();
    const name = await contract.name.call();
    const decimals = await contract.decimals.call();
    const symbol = await contract.symbol.call();
    assert.equal('1000000', totalSupply.toString());
    assert.equal('ChallengeToken', name);
    assert.equal('8', decimals.toString());
    assert.equal('CHT', symbol);
  });

  it('should give all initial tokens to creator', async () => {
    const contract = await ChallengeToken.deployed();

    const balance = await contract.balanceOf.call(accounts[0]);
    const totalSupply = await contract.totalSupply.call();
    assert.equal(balance.toString(), totalSupply.toString());
  });

  it('should allow to transfer tokens when whitelisted', async () => {
    // arrange
    const contract = await ChallengeToken.deployed();
    const whitelist = await WhiteList.deployed();
    whitelist.addToWhitelist.sendTransaction(accounts[1], { from: accounts[0] });

    // act
    await contract.transfer.sendTransaction(accounts[1], 500, { from: accounts[0] });
    const balanceOf = await contract.balanceOf.call(accounts[1]);
    assert.equal('500', balanceOf.toString());
  });
});
