# My Blockchain Project

## Requirements
- `node -v >= v8.11.0`
- [MetaMask](https://metamask.io/) browser extension for smart contract interaction.

## Install
### Prepare environment
Add a file `.env` to your project root.
Inside the file, create two variables:
```dotenv
INFURA_URL=https://rinkeby.infura.io/v3/<API_KEY>
MNEMONIC=<YOUR_MNEMONIC>
```
The `INFURA_URL` can be created here [Infura](https://infura.io/).

The `MNEMONIC` is used for for contract deployment.

### Install dependencies
Run `npm install` to fetch all required node modules.

### Deploy smart contracts
##### on the Rinkeby testnet
Run `truffle migrate --network rinkeby` to deploy smart contracts.

##### on a local testnet
1. Start a local testnet by running `npx ganache-cli --mnemonic <YOUR_MNEMONIC>`.
2. Deploy your contracts by running `truffle migrate`.

## Start
### Interact with the React app
Run `npm start` to start the application. Your browser should automatically open.
Depending on your selected network, the application might not start.
Proceed with the next step.

### Interact with the smart contracts
##### on the Rinkeby testnet
Open the MetaMask extension and make sure you have selected `Rinkeby Test Network` at the top.

##### on a local testnet
Open the MetaMask extension and make sure you have selected `Localhost 8545` at the top. 

## Test
1. Start a local testnet by running `npx ganache-cli`.
2. Deploy smart contracts to testnet by running `truffle deploy`.
3. Test smart conctracts by running `truffle test`.

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
 
### Smart contract tests
1. Start a development node by running `npx ganache-cli` in a separate terminal.
2. Deploy the smart contracts to the development network by running `truffle deploy`.
3. Run `truffle test` to start the testrunner.

### Command line tools used
- [create-react-app](https://github.com/facebook/create-react-app) to set up react boilerplate, hot-reloading, linting and babeling
- [truffle](https://github.com/trufflesuite/truffle) to set up solidity boilerplate, testing and deploying

### Mentionable dependencies
- [dotenv](https://github.com/motdotla/dotenv) to make easy use of environment variables
- [drizzle](https://github.com/trufflesuite/drizzle) to use a redux-like environment to interact with the smart contracts
