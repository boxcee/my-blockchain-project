# My Blockchain Project

## Requirements
- [Node.js](https://nodejs.org/en/) JavaScript runtime.
- [MetaMask](https://metamask.io/) browser extension for smart contract interaction.

## Install


##

As I had some difficulties finding a good idea for a smart contract I went with
implementing my own small whitelisting solution and my own token (ChallengeToken).

This application is made out of two parts, a React app running on Heroku 
and two Solidity smart contracts (ChallengeToken, Whitelist) running on the Ethereum Rinkeby testnet.

The React app is a small web app to interact with the smart contracts.

When opening the webapp, the user should have the option to display her token balance
and transfer tokens to another address. However, the smart contracts only allow transfer
if the address to send to is whitelisted.

When the user is the owner of the Whitelist contract (mostly the deployer of the contract),
 she may add other addresses as whitelisted.
 
## Development/Local
1. `npx ganache-cli -m <MNEMONIC>` to start the ganache node. You should use the same mnemonic
as used in your MetaMask extension.
2. `truffle migrate` to deploy the smart contracts on your node.
3. `npm start` to start the React app.
4. Open `http://localhost:3000` in your browser.

## Testnet
1. Make sure you have set up your `.env` file correctly.
2. `truffle migrate --network rinkeby` to deploy smart contracts on the
 Rinkeby network using your credentials.
3. `npm start` to start the React app.
4. Open `http://localhost:3000` in your browser.

### Install
`npm install`

### Test
`truffle test` for contract tests.

### Environment variables used
`MNEMONIC` Mnemonic used for deployment and interaction with contracts.

`INFURA_URL` Infura API URL to access Ethereum blockchain.

### Command line tools used
- [dotenv](https://github.com/motdotla/dotenv) to make easy use of environment variables
- [create-react-app](https://github.com/facebook/create-react-app) to set up react boilerplate, hot-reloading, linting and babeling
- [truffle](https://github.com/trufflesuite/truffle) to set up solidity boilerplate, testing and deploying

### Mentionable dependencies
- [MetaMask]() 
- [drizzle](https://github.com/trufflesuite/drizzle) to use a redux-like environment to interact with the smart contracts
