# My Blockchain Project

As I had some difficulties finding a good idea for a smart contract I went with
implementing my own small whitelisting solution and my own token (ChallengeToken).

This application is made out of two parts, a React app and two Solidity smart contracts.

The React app is a small web app to interact with the smart contracts.

### Requirements
`node >= 8.11.0`

### Install
`npm install`

### Test
`truffle test` for contract tests.

### Environment variables used
`MNEMONIC` Mnemonic used for deployment and interaction with contracts.

`INFURA_URL` Infura API URL to access Ethereum blockchain.

### Command line tools used
- [create-react-app](https://github.com/facebook/create-react-app) to set up react boilerplate, hot-reloading, linting and babeling
- [truffle](https://github.com/trufflesuite/truffle) to set up solidity boilerplate, testing and deploying
- [drizzle](https://github.com/trufflesuite/drizzle) to use a redux-like environment to interact with the smart contracts
