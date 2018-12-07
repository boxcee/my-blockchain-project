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

## Linting
`npm run eslint` to run the JS linter.

`npm run solhint` to run the smart contract linter.

## Usage
The application has one admin user.
The admin user is the user who has deployed the smart contracts to the testnet.

The admin user can access the 'Administration' view, but other users cannot. This
is checked by testing the used address against the owner address of the Whitelist smart contract.

The selection for the 'Administration' view is omitted from the menu for other user. Should they try
and open the route manually, they will see a message informing them about their missing rights.

There are two other views implemented. A 'Balance' view and a 'Transfer' view.

The 'Balance' view allows the user to check the balance for a given address. I implemented a check
to make sure the address entered is a valid Ethereum address.

The 'Transfer' view allows the user to transfer tokens from her address to another address.
I implemented three checks here. First, the same check as with balance, the address entered must be a valid
Ethereum address. Second, I check whether the address is whitelisted and the user is informed before she
tries to transfer the tokens. Third, the entered amount of tokens is checked against
the current balance of the used account. Should the amount be higher than the available tokens,
the transfer will be disabled.

The 'Administration' view also implements the first check for a valid address.

### Command line tools used
- [create-react-app](https://github.com/facebook/create-react-app) to set up react boilerplate, hot-reloading, linting and babeling
- [truffle](https://github.com/trufflesuite/truffle) to set up solidity boilerplate, testing and deploying

### Mentionable dependencies
- [material-ui](https://material-ui.com/) for some solid material design ready-made components
- [dotenv](https://github.com/motdotla/dotenv) to make easy use of environment variables
- [drizzle](https://github.com/trufflesuite/drizzle) to use a redux-like environment to interact with the smart contracts
