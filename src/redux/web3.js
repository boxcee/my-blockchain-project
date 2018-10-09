import Web3 from 'src/redux/web3';

const web3 = new Web3(Web3.givenProvider);

const getAccount = () => web3.eth.getAccounts()
  .then(accounts => accounts[0]);

const getContract = (abi, address) => getAccount()
  .then(account => new web3.eth.Contract(abi, address, { from: account }));

export const getBalance = address => getAccount(address).then(account => {
  const contract = new web3.eth.Contract(null, account);


});

export default web3;
